package main

import (
	"backend/golang/internal/infraestructure/config"
	"backend/golang/internal/infraestructure/db"
	"backend/golang/internal/infraestructure/router"
	"fmt"
	"log"
)

func main() {

	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	r, err := router.NewRouter(cfg)
	if err != nil {
		log.Fatalf("failed to setup router: %v", err)
	}

	if err := db.WaitDB(cfg.Dburl); err != nil {
		log.Fatalf("failed to wait for db: %v", err)
	}

	serverAddr := fmt.Sprintf(":%s", cfg.ServerPort)
	if err := r.Engine().Run(serverAddr); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}

}
