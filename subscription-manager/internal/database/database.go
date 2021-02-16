package database

import (
	"context"
	"fmt"
	"subscription-manager/internal/config"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
)

var (
	cfg = config.Load()
)

// Database struct
type Database struct {
	Connection *sqlx.DB
}

// New database instance
func New() (*Database, error) {
	logrus.Info("Building database connection")
	ctx, _ := context.WithCancel(context.Background())

	dsn := fmt.Sprintf(cfg.Database.DSN)

	conn, err := sqlx.ConnectContext(ctx, "mysql", dsn)
	if err != nil {
		fmt.Printf("err: %+2v\n", err)
		return nil, err
	}

	return &Database{Connection: conn}, nil
}
