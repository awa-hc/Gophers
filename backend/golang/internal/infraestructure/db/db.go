package db

import (
	"backend/golang/internal/core/domain/models"
	"backend/golang/internal/infraestructure/config"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDB(cfg *config.Config) (*gorm.DB, error) {
	dbURL := cfg.Dburl

	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}
	if err := db.AutoMigrate(&models.User{}, &models.Project{}); err != nil {
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}

	return db, nil

}
