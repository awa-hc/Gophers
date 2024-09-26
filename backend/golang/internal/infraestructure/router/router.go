package router

import (
	"backend/golang/internal/infraestructure/aws"
	"backend/golang/internal/infraestructure/config"
	"backend/golang/internal/infraestructure/db"
	"backend/golang/internal/infraestructure/server"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Router struct {
	engine     *gin.Engine
	db         *gorm.DB
	awsSession *session.Session
}

func NewRouter(cfg *config.Config) (*Router, error) {
	database, err := db.InitDB(cfg)
	if err != nil {
		return nil, err
	}

	awsSession, err := aws.InitAWSSession(cfg)
	if err != nil {
		return nil, err
	}

	router := &Router{
		engine:     gin.Default(),
		db:         database,
		awsSession: awsSession,
	}
	router.setupRoutes(cfg)
	return router, nil

}

func (r *Router) Engine() *gin.Engine {
	return r.engine
}

func (r *Router) setupRoutes(cfg *config.Config) {

	server.SetupUserRouter(r.engine, r.db)
	server.SetupProjectRouter(r.engine, r.db, r.awsSession, cfg.AWSBucket)

}
