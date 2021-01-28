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

	// TODO
	// - JWT auth

	switch payload.Type {
	case "com.alloycard.core.entities.user.TransactionEvent":
		// TODO check if is it the event type correct
		app.postTransaction(body)
	}
}
