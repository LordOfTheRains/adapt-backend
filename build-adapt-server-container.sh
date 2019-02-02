#!/bin/bash

#builds docker server container on the custom net
#docker build  --no-cache --network=adapt-darknet -t adapt-server .
docker build  --no-cache -t adapt-server .
