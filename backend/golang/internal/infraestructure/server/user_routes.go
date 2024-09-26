package server

import (
	"backend/golang/internal/adapters/handlers"
	"backend/golang/internal/adapters/repositories"
	"backend/golang/internal/core/ports/input"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupUserRouter(r *gin.Engine, db *gorm.DB) {

	userRepo := repositories.NewGormUserRepository(db)
	userService := input.NewUserService(userRepo)
	userHandler := handlers.NewUserService(userService)

	api := r.Group("/api")
	{
		users := api.Group("/users")
		{
			users.POST("/", userHandler.Create)
			users.GET("/:id", userHandler.GetById)
			users.PUT("/:id", userHandler.Update)
			users.DELETE("/:id", userHandler.Delete)
			users.GET("/", userHandler.ListAll)
		}
	}

}
