package input

import (
	"backend/golang/internal/core/domain/models"
	"backend/golang/internal/core/ports/output"
)

type UserService struct {
	userRepo output.UserRepository
}

func NewUserService(userRepo output.UserRepository) *UserService {
	return &UserService{
		userRepo: userRepo,
	}
}

func (s *UserService) Create(user *models.User) error {
	return s.userRepo.Create(user)
}

func (s *UserService) GetById(id uint) (*models.User, error) {
	return s.userRepo.FindByID(id)
}

func (s *UserService) Update(user *models.User) error {
	return s.userRepo.Update(user)
}
func (s *UserService) Delete(id uint) error {
	return s.userRepo.Delete(id)
}
func (s *UserService) ListAll() ([]*models.User, error) {
	return s.userRepo.FindAll()
}
