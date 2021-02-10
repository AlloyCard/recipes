package server

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/sirupsen/logrus"
)

type event struct {
	Type string `json:"_alloyCardType"`
}

type transactionEvent struct {
	Principal struct {
		Type string `json:"_alloyCardType"`
		ID   string `json:"entityID"`
	} `json:"principal"`
	Event struct {
		Type        string `json:"_alloyCardType"`
		Transaction struct {
			Type string `json:"_alloyCardType"`
			ID   string `json:"entityID"`
		} `json:"transaction"`
		CreatedAt int    `json:"createdAt"`
		EventID   string `json:"eventId"`
	} `json:"event"`
	WebhookURL string `json:"webhookUrl"`
}

func (app *App) webhookHandler(rw http.ResponseWriter, req *http.Request) {
	payload := transactionEvent{}

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		logrus.WithError(err).Error("fail in read body")
		return
	}

	err = json.Unmarshal(body, &payload)
	if err != nil {
		logrus.WithError(err).Error("fail in decode body")
		return
	}

	switch payload.Event.Type {
	case "com.alloycard.core.entities.transaction.TransactionCreatedEvent":
		app.postTransaction(payload)
	}
}
