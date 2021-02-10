package database

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
)

// FetchMerchants to Database
func (db *Database) FetchMerchants() []string {
	var query string = "SELECT name FROM recipe_subscription_manager.merchant;"
	merchants := []string{}
	_ = db.selectRows(query, &merchants)
	return merchants
}

func (db *Database) selectRows(query string, resp *[]string) error {
	err := db.Connection.Select(resp, query)
	if err != nil {
		logrus.WithError(err).Errorf("fail to execute query %s", query)
		return err
	}

	return nil
}
