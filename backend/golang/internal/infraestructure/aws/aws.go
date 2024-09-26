package aws

import (
	"backend/golang/internal/infraestructure/config"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/pkg/errors"
)

func InitAWSSession(cfg *config.Config) (*session.Session, error) {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(cfg.AWSRegion),
		Credentials: credentials.NewStaticCredentials(cfg.AwsKey, cfg.AwsSecret, ""),
	})

	if err != nil {
		return nil, errors.Wrap(err, "error creating aws session")
	}
	return sess, nil
}
