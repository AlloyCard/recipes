package database

import (
	"context"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// Database struct
type Database struct {
	Connection *sqlx.DB
}

// New database instance
func New() (*Database, error) {
	ctx, _ := context.WithCancel(context.Background())
	// TODO handler error

	// TODO move to env
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s",
		"root",
		"H7ef2ZZVcA",
		"172.17.0.2:3306",
		"recipe_subscription_manager")

	conn, err := sqlx.ConnectContext(ctx, "mysql", dsn)
	if err != nil {
		fmt.Printf("err: %+2v\n", err)
		return nil, err
	}

	return &Database{Connection: conn}, nil
}
