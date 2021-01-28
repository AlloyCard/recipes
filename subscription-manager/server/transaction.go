package server

import (
	"encoding/json"
	"net/http"
)

type transactionEvent struct {
	CreatedAt   int    `json:"createdAt"`
	EventID     string `json:"eventId"`
	Transaction struct {
		Type string `json:"_alloyCardType"`
		ID   string `json:"entityID"`
	} `json:"transaction"`
}

func (app *App) postTransaction(rw http.ResponseWriter, req *http.Request) {
	payload := transactionEvent{}

	rw.Header().Set("Content-Type", "application/json")
	err := json.NewDecoder(req.Body).Decode(&payload)
	if err != nil {
		// TODO log
		return
	}

	// handler payload.Transaction.Type
	// fetch data on graphql api
	// parse createAt to datetime

	app.Database.InsertTransaction(
		payload.Transaction.ID, payload.CreatedAt,
	)
}
