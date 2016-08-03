#!/usr/bin/env bash
#set -e

cd server
CGO_ENABLED=0 GOOS=linux go build -a -tags netgo -ldflags "-w" -o server
cd ..
docker-compose down
docker-compose build
docker-compose up -d