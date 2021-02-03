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

func (app *App) webhookHandler(rw http.ResponseWriter, req *http.Request) {
	payload := event{}

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

	switch payload.Type {
	case "com.alloycard.core.entities.transaction.TransactionCreatedEvent":
		app.postTransaction(body)
	}
}
