package server

import (
	"backend/golang/internal/adapters/handlers"
	"backend/golang/internal/adapters/repositories"
	"backend/golang/internal/core/ports/input"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupProjectRouter(r *gin.Engine, db *gorm.DB, awsSession *session.Session, s3Bucket string) {

	projectRepo := repositories.NewAWSProjectRepository(db, awsSession, s3Bucket)
	projectService := input.NewProjectService(projectRepo)
	projectHandler := handlers.NewProjectHandler(projectService)

	api := r.Group("/api")
	{
		projects := api.Group("/projects")
		{
			projects.POST("/", projectHandler.Create)
			projects.POST("/:id/files", projectHandler.UploadProjectFiles)
			projects.GET("/", projectHandler.FindAll)
			projects.GET("/user/:id", projectHandler.FindByUserID)
			projects.GET("/:id", projectHandler.GetById)

		}
	}

}
