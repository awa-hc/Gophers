package output

import "backend/golang/internal/core/domain/models"

type UserRepository interface {
	Create(user *models.User) error
	FindByID(id uint) (*models.User, error)
	Update(user *models.User) error
	Delete(id uint) error
	FindAll() ([]*models.User, error)
}
