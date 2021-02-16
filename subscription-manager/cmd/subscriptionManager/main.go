package main

import (
	"subscription-manager/api/server"
	"subscription-manager/internal/config"

	"github.com/sirupsen/logrus"
)

var (
	cfg = config.Load()
)

func main() {
	loglvl, err := logrus.ParseLevel(cfg.LogLevel)
	if err != nil {
		logrus.WithError(err).
			WithField("level", cfg.LogLevel).
			Fatal("Error in set log level")
	}
	logrus.SetLevel(loglvl)

	server.Run(cfg.Server.Port)
}
