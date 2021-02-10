package database

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
)

// InsertTransaction to Database
func (db *Database) InsertTransaction(id string, createdAt int) error {
	logrus.Infof("Inserting transaction\"%s\" to database", id)

	var query string = fmt.Sprintf(
		"INSERT INTO transaction VALUES ('%s', FROM_UNIXTIME(%d));", id, createdAt,
	)
	return db.insert(query)
}

func (db *Database) insert(query string) error {
	err := db.Connection.Select(&[]int{}, query)
	if err != nil {
		logrus.WithError(err).Errorf("fail to execute query %s", query)
		return err
	}

	return nil
}
