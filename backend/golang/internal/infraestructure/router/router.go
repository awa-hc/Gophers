package router

import (
	"backend/golang/internal/infraestructure/aws"
	"backend/golang/internal/infraestructure/config"
	"backend/golang/internal/infraestructure/db"
	"backend/golang/internal/infraestructure/server"
	"fmt"
	"net/http"
	"time"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/gin-contrib/cors"
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

	router.applyMiddlewares()
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

func (r *Router) applyMiddlewares() {

	fmt.Println("Applying middlewares")

	r.engine.Use(cors.New(cors.Config{

		AllowOrigins:     []string{"https://gophers-pied.vercel.app", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	r.engine.OPTIONS("/*any", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "https://gophers-pied.vercel.app")
		c.Header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Status(http.StatusOK)
	})

}
