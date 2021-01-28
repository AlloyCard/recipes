package server

import (
	"encoding/json"
	"net/http"
)

type event struct {
	Type string `json:"_alloyCardType"`
}

func (app *App) webhookHandler(rw http.ResponseWriter, req *http.Request) {
	payload := event{}
	type response struct {
		Message string `json:"message"`
	}

	err := json.NewDecoder(req.Body).Decode(&payload)
	if err != nil {
		// TODO log
		return
	}

	if payload.Type == "com.alloycard.core.entities.user.TransactionEvent" {
		app.postTransaction(rw, req)
	}
}
