#! /bin/bash
docker-compose up -d
nohup npx yarn start:dev &
nohup mvn spring-boot:run &
