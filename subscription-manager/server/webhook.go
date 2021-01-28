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
		logrus.WithError(err).Error("read body fail")
		return
	}

	err = json.Unmarshal(body, &payload)
	if err != nil {
		logrus.WithError(err).Error("decode body fail")
		return
	}

	switch payload.Type {
	case "com.alloycard.core.entities.user.TransactionEvent":
		app.postTransaction(body)
	}
}
