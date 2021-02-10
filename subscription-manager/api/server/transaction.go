package server

import (
	"strings"

	"subscription-manager/internal/alloy"
)

var (
	merchantSubscriptions = []string{}
)

func (app *App) postTransaction(payload transactionEvent) {
	merchantName, err := alloy.GetTransactionMerchant(payload.Event.Transaction.ID, payload.Principal.ID)
	if err != nil {
		return
	}

	if isSubscription(merchantName) {
		app.Database.InsertTransaction(
			payload.Event.Transaction.ID, payload.CreatedAt,
		)
	}

}

func isSubscription(merchantName string) bool {
	merc := strings.ToLower(merchantName)
	for _, name := range merchantSubscriptions {
		if merc == strings.ToLower(name) {
			return true
		}
	}
	return false
}
