.DEFAULT_GOAL := help

APP_NAME?=subscription-manager
APP_DIR = /go/src/github.com/alloycard/${APP_NAME}
DOCKER_BASE_IMAGE=golang:1.15
PORT=8092

run-dev:
	@echo "\e[1m\033[33mRunning on port ${PORT}\e[0m"
	@make docker-command COMMAND="go run main.go"

debug:
	@echo "\e[1m\033[33mDebug mode\e[0m"
	@make docker-command COMMAND="bash"

docker-command: remove-containers
	@docker run -it -v $(shell pwd):${APP_DIR} -w ${APP_DIR} \
		--env-file .env -p ${PORT}:8092 --name ${APP_NAME}-debug \
		${DOCKER_BASE_IMAGE} bash -c "${COMMAND}"

remove-containers:
ifneq ($(shell docker ps --filter "name=${APP_NAME}" -aq 2> /dev/null | wc -l | bc), 0)
	@echo "\e[1m\033[33mRemoving containers\e[0m"
	@docker ps --filter "name=${APP_NAME}" -aq | xargs docker rm -f
endif

ip:
	@docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${APP_NAME}
