#!/bin/bash

#create docker custom network for server and database to communicate
docker network create adapt-net
#builds docker server container on the custom net
docker build --network=adapt-net -t adapt-server .

