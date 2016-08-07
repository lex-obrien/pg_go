#!/usr/bin/env bash
#set -e

cd server
CGO_ENABLED=0 GOOS=linux go build -a -tags netgo -ldflags "-w" -o server
cd ..
eval $(docker-machine env --shell=bash default)
docker-compose down -v
docker-compose build
docker-compose up -d