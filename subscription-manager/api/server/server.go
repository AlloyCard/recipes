package server

import (
	"fmt"
	"net/http"

	"subscription-manager/internal/database"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

// App is the web aplication struct with http server and database connection
type App struct {
	Database *database.Database
	Server   http.Server
}

// Run start app App
func Run(port int) {
	logrus.Info("Start running subscription manager server")
	db, err := database.New()
	defer db.Connection.Close()
	if err != nil {
		logrus.WithError(err).Fatal("connection with database fail")
	}

	merchantSubscriptions = db.FetchMerchants()
	logrus.Infof("\"%d\" subscription services registreds on database", len(merchantSubscriptions))

	app := App{Database: db}

	r := mux.NewRouter()
	r.HandleFunc("/webhook", app.webhookHandler).Methods(http.MethodPost)

	app.Server = http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: r,
	}

	panic(app.Server.ListenAndServe())
}
