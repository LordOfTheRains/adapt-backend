#!/bin/bash

docker rm -f adapt-backend
docker run --network=adapt-darknet -it -d -p 8080:3000 --name adapt-backend adapt-server
