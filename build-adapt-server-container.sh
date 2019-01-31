#!/bin/bash

#create docker custom network for server and database to communicate
docker network create --subnet=172.19.0.0/16 adapt-darknet
#builds docker server container on the custom net
docker build --no-cache --network=adapt-darknet -t adapt-server .

