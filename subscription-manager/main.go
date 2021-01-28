package main

import (
	"subscription-manager/config"
	"subscription-manager/server"

	"github.com/sirupsen/logrus"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		logrus.WithError(err).Fatal("Error in load Enviromnts variables.")
	}

	loglvl, err := logrus.ParseLevel(cfg.LogLevel)
	if err != nil {
		logrus.WithError(err).Fatalf(
			"Error in set log level %s.", cfg.LogLevel)
	}
	logrus.SetLevel(loglvl)

	server.Run(cfg.Server.Port)
}
