package database

import (
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
)

// Transaction financial
type Transaction struct {
	ID            int       `db:"id"`
	Merchant      string    `db:"merchant"`
	Amount        float32   `db:"amount"`
	RecipeInstall string    `db:"recipe_install"`
	CreatedAt     time.Time `db:"created_at"`
}

// InsertTransaction to Database
func (db *Database) InsertTransaction(id, merchant string, amount float32, createdAt int) error {
	logrus.Infof("Inserting transaction\"%s\" to database", id)

	var query string = fmt.Sprintf(
		"INSERT INTO transaction VALUES ('%s', '%s', '%.2f', FROM_UNIXTIME(%d));", id, merchant, amount, createdAt/1000,
	)
	return db.insert(query)
}

// FetchTransactionsByRecipeInstallAndMerchant to Database
func (db *Database) FetchTransactionsByRecipeInstallAndMerchant(recipeInstallID, merchant string) ([]Transaction, error) {
	var query string = fmt.Sprintf(
		"SELECT amount, created_at FROM transaction WHERE recipeInstall = '%s' AND merchant = '%s' ORDER BY created_at;", recipeInstallID, merchant,
	)
	response := []Transaction{}

	err := db.Connection.Select(&response, query)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (db *Database) insert(query string) error {
	err := db.Connection.Select(&[]int{}, query)
	if err != nil {
		return err
	}

	return nil
}
