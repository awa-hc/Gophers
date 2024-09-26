package repositories

import (
	"backend/golang/internal/core/domain/models"
	"bytes"
	"fmt"
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
	contentType := ""
	// Establecer el tipo de contenido basado en la extensión del archivo
	if strings.HasSuffix(filename, ".html") {
		contentType = "text/html"
	} else if strings.HasSuffix(filename, ".css") {
		contentType = "text/css"
	} else if strings.HasSuffix(filename, ".js") {
		contentType = "application/javascript"
	} else {
		contentType = "application/octet-stream" // Tipo de contenido por defecto
	}

	_, err := r.s3.PutObject(&s3.PutObjectInput{
		Bucket:      aws.String(r.bucket),
		Key:         aws.String(key),
		Body:        bytes.NewReader(content),
		ContentType: aws.String(contentType),
	})

	if err != nil {
		return "", err
	}

	return fmt.Sprintf("https://%s.s3.amazonaws.com/%s", r.bucket, key), nil
}

// Delete implements output.ProjectRepository.
func (r *AWSProjectRepository) Delete(projectID uint) error {
	panic("unimplemented")
}

// FindByID implements output.ProjectRepository.
func (r *AWSProjectRepository) FindByID(projectID uint) (*models.Project, error) {

	var project models.Project
	err := r.db.Where("id = ?", projectID).First(&project).Error
	return &project, err

}

// GetFile implements output.ProjectRepository.
func (r *AWSProjectRepository) GetFile(projectID uint, fileType string) ([]byte, error) {

	key := fmt.Sprintf("projects/%d/%s.%s", projectID, fileType, fileType)
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
