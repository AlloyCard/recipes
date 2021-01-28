package database

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
)

// InsertTransaction to Database
func (db *Database) InsertTransaction(id string, createdAt int) error {
	var query string = fmt.Sprintf(
		"INSERT INTO transaction VALUES ('%s', FROM_UNIXTIME(%d));", id, createdAt,
	)
	return db.executeQuery(query)
}

func (db *Database) executeQuery(query string) error {
	var ids []int
	err := db.Connection.Select(&ids, query)
	if err != nil {
		logrus.WithError(err).Errorf("fail to execute query %s", query)
		return err
	}

	return nil
}
