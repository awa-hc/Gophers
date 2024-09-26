package output

import "backend/golang/internal/core/domain/models"

type ProjectRepository interface {
	Create(project *models.Project) error
	FindAll() ([]models.Project, error)
	FindByUserID(userID uint) ([]models.Project, error)
	UploadFile(projectID uint, fileType string, content []byte, filename string) (string, error)
	GetFile(projectID uint, fileType string) ([]byte, error)
	Delete(projectID uint) error
	FindByID(projectID uint) (*models.Project, error)
	Update(project *models.Project) error
}
