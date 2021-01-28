package database

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

// InsertTransaction to Database
func (db *Database) InsertTransaction(id string, createdAt int) error {

	var query string = fmt.Sprintf(
		"INSERT INTO transaction VALUES (%s, %d);", id, createdAt,
	)
	return db.executeQuery(query)
}

func (db *Database) executeQuery(query string) error {
	var ids []int
	err := db.Connection.Select(&ids, query)
	if err != nil {
		return err
	}
	return err
}
