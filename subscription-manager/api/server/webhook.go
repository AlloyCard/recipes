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
	// logrus.Debug("webhook endpoint trigged")
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
	// logrus.Debugf("type: %+2v", payload.Type)

	switch payload.Type {
	case "com.alloycard.core.entities.transaction.TransactionCreatedEvent":
		app.postTransaction(body)
	}
}
