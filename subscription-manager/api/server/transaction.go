package server

import (
	"strings"

	"subscription-manager/internal/database"
	"subscription-manager/pkg/alloy"

	"github.com/sirupsen/logrus"
)

var (
	merchantSubscriptions = []string{}
)

func (app *App) postTransaction(payload transactionEvent) {
	trx, err := alloy.GetTransaction(payload.Event.Transaction.ID, payload.Principal.ID)
	if err != nil {
		logrus.WithError(err).Error("Fail to get transaction from Alloy API")
		return
	}
	logrus.Debugf("%+2v", *trx)

	if !isSubscription(trx.MerchantName) {
		err = alloy.AddNonSubscriptionPanel(payload.Principal.ID, payload.Event.Transaction.ID)
		if err != nil {
			logrus.WithError(err).Error("Fail to add non subscription panel on Alloy API")
		}
		return
	}

	err = app.Database.InsertTransaction(
		payload.Event.Transaction.ID, trx.MerchantName, payload.Principal.ID, trx.Amount,
		trx.TransactionDate)
	if err != nil {
		logrus.WithError(err).Error("Fail to insert transaction to Database")
		return
	}

	trxs, err := app.Database.FetchTransactionsByRecipeInstallAndMerchant(
		payload.Principal.ID, trx.MerchantName)
	if err != nil {
		logrus.WithError(err).Error("Fail to fetch transactions from Database")
		return
	}

	err = alloy.AddSubscriptionPanel(payload.Principal.ID, payload.Event.Transaction.ID,
		trxs[0].CreatedAt, sumTotalAmount(trxs))
	if err != nil {
		logrus.WithError(err).Error("Fail to add subscription panel on Alloy API")
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

func sumTotalAmount(transactions []database.Transaction) float32 {
	var total float32 = 0
	for _, trx := range transactions {
		total += trx.Amount
	}
	return total
}
