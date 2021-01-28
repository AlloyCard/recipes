.DEFAULT_GOAL := help

APP_NAME?=subscription-manager
APP_DIR = /go/src/github.com/alloycard/${APP_NAME}
DOCKER_BASE_IMAGE=golang:1.15
PORT=8092

debug:
	@echo "\e[1m\033[33mDebug mode\e[0m"
	@docker run -it -v $(shell pwd):${APP_DIR} -w ${APP_DIR} \
		--env-file .env -p ${PORT}:8092 --name ${APP_NAME}-debug \
		${DOCKER_BASE_IMAGE} bash

print:
	@echo ${APP_NAME}

ip:
	@docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${APP_NAME}
