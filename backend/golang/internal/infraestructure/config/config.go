package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Dburl      string
	Dev_Dburl  string
	ServerPort string
	AWSRegion  string
	AWSBucket  string
	AwsKey     string
	AwsSecret  string
}

func LoadConfig() (*Config, error) {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file", err)
	}
	return &Config{
		Dburl:      getEnv("DATABASE_URL", "default_db_url"),
		Dev_Dburl:  getEnv("DATABASE_URL_DEV", "default_dev_db_url"),
		ServerPort: getEnv("SERVER_PORT", "8080"),
		AWSRegion:  getEnv("AWS_REGION", "us-east-1"),
		AWSBucket:  getEnv("AWS_BUCKET_NAME", "my-default-bucket"),
		AwsKey:     getEnv("AWS_ACCESS_KEY", "default_aws_key"),
		AwsSecret:  getEnv("AWS_SECRET_KEY", "default_aws_secret"),
	}, nil

}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
