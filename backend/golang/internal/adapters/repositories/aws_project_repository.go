package repositories

import (
	"backend/golang/internal/core/domain/models"
	"bytes"
	"fmt"
	"path/filepath"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"gorm.io/gorm"
)

type AWSProjectRepository struct {
	db     *gorm.DB
	s3     *s3.S3
	bucket string
}

func NewAWSProjectRepository(db *gorm.DB, awsSession *session.Session, bucket string) *AWSProjectRepository {
	return &AWSProjectRepository{
		db:     db,
		s3:     s3.New(awsSession),
		bucket: bucket,
	}
}

func (r *AWSProjectRepository) Create(project *models.Project) error {
	return r.db.Create(project).Error
}

func (r *AWSProjectRepository) Update(project *models.Project) error {
	return r.db.Save(project).Error
}

func (r *AWSProjectRepository) FindAll() ([]models.Project, error) {
	var projects []models.Project
	err := r.db.Find(&projects).Error
	return projects, err
}

func (r *AWSProjectRepository) FindByUserID(userID uint) ([]models.Project, error) {
	var projects []models.Project
	err := r.db.Where("user_id = ?", userID).Find(&projects).Error
	return projects, err
}
func (r *AWSProjectRepository) UploadFile(projectID uint, fileType string, content []byte, filename string) (string, error) {
	key := fmt.Sprintf("projects/%d/%s", projectID, filename)

	// Mapa para definir los tipos de contenido y sus extensiones
	contentTypes := map[string]string{
		"html": "text/html",
		"css":  "text/css",
		"js":   "application/javascript",
	}

	// Verificar que el tipo de archivo sea válido
	contentType, ok := contentTypes[fileType]
	if !ok {
		return "", fmt.Errorf("tipo de archivo no válido: %s", fileType)
	}

	// Verificar si ya existe un archivo con la misma extensión
	objects, err := r.s3.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(r.bucket),
		Prefix: aws.String(fmt.Sprintf("projects/%d/", projectID)),
	})

	if err != nil {
		return "", fmt.Errorf("error al listar archivos: %w", err)
	}

	// Verificar si ya existe un archivo de este tipo y eliminarlo si es necesario
	for _, object := range objects.Contents {
		if strings.HasSuffix(*object.Key, "."+fileType) {
			_, err := r.s3.DeleteObject(&s3.DeleteObjectInput{
				Bucket: aws.String(r.bucket),
				Key:    object.Key,
			})
			if err != nil {
				return "", fmt.Errorf("error al eliminar el archivo existente %s: %w", *object.Key, err)
			}
			break // Salimos del bucle después de eliminar el archivo existente
		}
	}

	// Subir el nuevo archivo
	_, err = r.s3.PutObject(&s3.PutObjectInput{
		Bucket:      aws.String(r.bucket),
		Key:         aws.String(key),
		Body:        bytes.NewReader(content),
		ContentType: aws.String(contentType),
	})

	if err != nil {
		return "", fmt.Errorf("error al subir el archivo %s al proyecto %d: %w", filename, projectID, err)
	}

	return fmt.Sprintf("https://%s.s3.amazonaws.com/%s", r.bucket, key), nil
}

// Delete implements output.ProjectRepository.
func (r *AWSProjectRepository) Delete(projectID uint) error {

	err := r.db.Delete(&models.Project{}, projectID).Error

	if err != nil {
		return fmt.Errorf("error deleting project from database:  %d: %w", projectID, err)

	}
	err = r.deleteS3ObjectsByPrefix(fmt.Sprintf("projects/%d/", projectID))
	if err != nil {
		return fmt.Errorf("error deleting project files from S3: %d: %w", projectID, err)

	}

	return nil

}

// FindByID implements output.ProjectRepository.
func (r *AWSProjectRepository) FindByID(projectID uint) (*models.Project, error) {

	var project models.Project
	err := r.db.Where("id = ?", projectID).First(&project).Error
	return &project, err

}

func (r *AWSProjectRepository) GetFile(projectID uint, fileType string) ([]byte, error) {
	project, err := r.FindByID(projectID)
	if err != nil {
		return nil, err
	}

	var key string

	// Determinar la clave basándose en el tipo de archivo
	switch fileType {
	case "html":
		if project.HTMLURL == "" {
			return nil, fmt.Errorf("archivo HTML no encontrado para el ID del proyecto: %d", projectID)
		}

		key = fmt.Sprintf("projects/%d/%s", projectID, filepath.Base(project.HTMLURL))
	case "css":
		if project.CSSURL == "" {
			return nil, fmt.Errorf("CSS file not found for project ID: %d", projectID)
		}
		key = fmt.Sprintf("projects/%d/%s", projectID, filepath.Base(project.CSSURL))
	case "js":
		if project.JSURL == "" {
			return nil, fmt.Errorf("JS file not found for project ID: %d", projectID)
		}
		key = fmt.Sprintf("projects/%d/%s", projectID, filepath.Base(project.JSURL))
	default:
		return nil, fmt.Errorf("unsupported file type: %s", fileType)
	}

	resp, err := r.s3.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(r.bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return nil, err
	}

	buf := new(bytes.Buffer)
	buf.ReadFrom(resp.Body)
	return buf.Bytes(), nil
}

func (r *AWSProjectRepository) deleteS3ObjectsByPrefix(prefix string) error {
	// Listar objetos
	result, err := r.s3.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(r.bucket),
		Prefix: aws.String(prefix),
	})
	if err != nil {
		return fmt.Errorf("unable to list items in bucket %q, %v", r.bucket, err)
	}

	// Eliminar objetos
	if len(result.Contents) > 0 {
		var objectsToDelete []*s3.ObjectIdentifier
		for _, item := range result.Contents {
			objectsToDelete = append(objectsToDelete, &s3.ObjectIdentifier{Key: item.Key})
		}

		_, err = r.s3.DeleteObjects(&s3.DeleteObjectsInput{
			Bucket: aws.String(r.bucket),
			Delete: &s3.Delete{
				Objects: objectsToDelete,
			},
		})
		if err != nil {
			return fmt.Errorf("unable to delete items from bucket %q, %v", r.bucket, err)
		}
	}

	return nil
}
