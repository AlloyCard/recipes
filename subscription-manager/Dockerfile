FROM golang:1.14-alpine AS base
ENV CGO_ENABLED 0
ENV PORT 8092
ENV GOFLAGS -mod=vendor

EXPOSE $PORT

WORKDIR ${GOPATH}/src/github.com/alloycard/subscripion-manager/

RUN apk update && \
  apk upgrade && \
  apk add build-base && \
  rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

FROM base AS compiler
COPY . ./
RUN go mod vendor
RUN go build -o bin/subscripion-manager ./cmd/subscriptionManager/main.go

FROM debian:10.3-slim AS release
RUN apt install tzdata && \
  cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

COPY --from=compiler go/src/github.com/alloycard/subscripion-manager/bin/ bin/.

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static /bin/tini

COPY ./jwtRSA256-private.pem ./jwtRSA256-private.pem

RUN chmod +x /bin/tini && \
  addgroup --gid 1000 --system hu && \
  adduser --uid 1000 --system hu --ingroup hu
USER hu

ENTRYPOINT ["/bin/tini", "--"]


CMD ["./bin/subscripion-manager"]
