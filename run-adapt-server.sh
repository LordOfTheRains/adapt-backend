#!/bin/bash

docker rm -f adapt-backend
docker run --network=adapt-darknet --ip 172.19.0.21 -it -d -p 8080:3000 --name=adapt-backend \
-v $PWD/../adapt-image-server:/data/app/adapt-backend/adapt/server/storage \
adapt-server 

