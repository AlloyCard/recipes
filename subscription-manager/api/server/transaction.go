package server

import (
	"encoding/json"
	"strings"

	"subscription-manager/internal/alloy"

	"github.com/sirupsen/logrus"
)

const (
	// TODO how find recipeInstallID?
	recipeInstallID = "80e0d144-c499-472f-8d04-ee3f254b1b4d"
)

var (
	// TODO load from db
	merchantSubscriptions = [...]string{"netflix", "amazon"}
)

type transactionEvent struct {
	Type        string `json:"_alloyCardType"`
	CreatedAt   int    `json:"createdAt"`
	EventID     string `json:"eventId"`
	Transaction struct {
		Type string `json:"_alloyCardType"`
		ID   string `json:"entityID"`
	} `json:"transaction"`
}

func (app *App) postTransaction(body []byte) {
	payload := transactionEvent{}
	err := json.Unmarshal(body, &payload)
	if err != nil {
		logrus.WithError(err).Error("decode body fail")
		return
	}

	merchantName, err := alloy.GetTransactionMerchant(payload.Transaction.ID, recipeInstallID)
	if err != nil {
		return
	}

	if isSubscription(merchantName) {
		app.Database.InsertTransaction(
			payload.Transaction.ID, payload.CreatedAt,
		)
	}

}

func isSubscription(merchantName string) bool {
	merc := strings.ToLower(merchantName)
	for _, name := range merchantSubscriptions {
		if merc == name {
			return true
		}
	}
	return false
}
