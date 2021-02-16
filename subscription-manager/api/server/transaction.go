package server

import (
	"strings"

	"subscription-manager/pkg/alloy"

	"github.com/sirupsen/logrus"
)

var (
	merchantSubscriptions = []string{}
)

func (app *App) postTransaction(payload transactionEvent) {
	transaction, err := alloy.GetTransaction(payload.Event.Transaction.ID, payload.Principal.ID)
	if err != nil {
		logrus.WithError(err).Error("Fail to get transaction from Alloy API")
		return
	}

	if !isSubscription(transaction.MerchantName) {
		err = alloy.AddNonSubscriptionPanel(payload.Principal.ID, payload.Event.Transaction.ID)
		if err != nil {
			logrus.WithError(err).Error("Fail to get addPanel on Alloy API")
		}
		return
	}

	err = app.Database.InsertTransaction(
		payload.Event.Transaction.ID, transaction.MerchantName, transaction.Amount,
		transaction.TransactionDate)
	if err != nil {
		logrus.WithError(err).Error("Fail to insert transaction to Database")
		return
	}

	trxs, err := app.Database.FetchTransactionsByRecipeInstallAndMerchant(
		payload.Principal.ID, transaction.MerchantName)
	if err != nil {
		logrus.WithError(err).Error("Fail to fetch transactions from Database")
		return
	}

	var total float32 = 0
	for _, trx := range trxs {
		total += trx.Amount
	}

	err = alloy.AddSubscriptionPanel(payload.Principal.ID, payload.Event.Transaction.ID,
		trxs[0].CreatedAt, total)
	if err != nil {
		logrus.WithError(err).Error("Fail to get addPanel on Alloy API")
		return
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
