package server

import (
	"encoding/json"

	"github.com/sirupsen/logrus"
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

	// handler payload.Transaction.Type
	// fetch data on graphql api
	// parse createAt to datetime

	app.Database.InsertTransaction(
		payload.Transaction.ID, payload.CreatedAt,
	)
}
