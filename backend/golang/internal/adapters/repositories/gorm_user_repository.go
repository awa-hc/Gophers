package repositories

import (
	"backend/golang/internal/core/domain/models"

	"gorm.io/gorm"
)

type gormUserRepository struct {
	db *gorm.DB
}

func NewGormUserRepository(db *gorm.DB) *gormUserRepository {
	return &gormUserRepository{
		db: db,
	}
}

func (r *gormUserRepository) Create(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *gormUserRepository) FindByID(id uint) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, id).Error
	return &user, err
}

func (r *gormUserRepository) Update(user *models.User) error {
	return r.db.Save(user).Error
}

func (r *gormUserRepository) Delete(id uint) error {
	return r.db.Delete(&models.User{}, id).Error
}

func (r *gormUserRepository) FindAll() ([]*models.User, error) {
	var users []*models.User
	err := r.db.Find(&users).Error
	return users, err
}
