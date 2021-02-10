package server

import (
	"strings"

	"subscription-manager/internal/alloy"
)

var (
	merchantSubscriptions = []string{}
)

func (app *App) postTransaction(payload transactionEvent) {
	transaction, err := alloy.GetTransaction(payload.Event.Transaction.ID, payload.Principal.ID)
	if err != nil {
		return
	}

	if isSubscription(transaction.MerchantName) {
		app.Database.InsertTransaction(
			payload.Event.Transaction.ID, transaction.MerchantName, transaction.Amount, transaction.TransactionDate)
	}
}

func isSubscription(merchant string) bool {
	merc := strings.ToLower(merchant)
	for _, sub := range merchantSubscriptions {
		if merc == strings.ToLower(sub) {
			return true
		}
	}
	return false
}
