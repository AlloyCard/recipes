APP_NAME?=subscription-manager
APP_DIR = /go/src/github.com/alloycard/${APP_NAME}
DOCKER_STAGE ?= release
CONTAINER_NAME=${APP_NAME}-${DOCKER_STAGE}
DOCKER_IMAGE_NAME := alloycard/${CONTAINER_NAME}:latest
DOCKER_BASE_IMAGE=golang:1.15
PORT=8092

build-docker-image:
	@echo "\e[1m\033[33mBuilding docker image from Dockerfile\e[0m"
	@docker build --rm --target ${DOCKER_STAGE} . --tag ${DOCKER_IMAGE_NAME}

clean-up:
	@make remove-containers
	@make remove-images

run-dev:
	@clear
	@echo "\e[1m\033[33mRunning on port ${PORT}\e[0m"
	@make docker-command COMMAND="go run cmd/subscriptionManager/main.go"

run-release:
	@echo "\e[1m\033[33mRunning on port ${PORT}\e[0m"
	@docker run --rm --env-file .env -p ${PORT}:${PORT} \
		--name ${CONTAINER_NAME} ${DOCKER_IMAGE_NAME}

debug:
	@echo "\e[1m\033[33mDebug mode\e[0m"
	@make docker-command COMMAND="bash"

docker-command: remove-containers
	@docker run -it -v $(shell pwd):${APP_DIR} -w ${APP_DIR} \
		--env-file .env -p ${PORT}:8092 --name ${APP_NAME}-debug \
		${DOCKER_BASE_IMAGE} bash -c "${COMMAND}"

remove-containers:
ifneq ($(shell docker ps -a --filter "name=${APP_NAME}" -aq 2> /dev/null | wc -l | bc), 0)
	@echo "\e[1m\033[33mRemoving containers\e[0m"
	@docker ps -a --filter "name=${APP_NAME}" -aq | xargs docker rm -f
endif

remove-images:
ifneq ($(shell docker images -a alloycard/${APP_NAME}* -q 2> /dev/null | wc -l | bc), 0)
	@echo "\e[1m\033[33mRemoving images\e[0m"
	@docker images -a alloycard/${APP_NAME}* -aq | xargs docker image rm -f
endif

ip:
	@docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${APP_NAME}
