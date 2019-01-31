#!/bin/bash


#pull the docker mysql container image from docker hub
docker pull mysql/mysql-server:5.7

#run the container, port 3306 is automatically exposed within the dockerfile
#the adapt-darknet must be created first, if not run the folllowing to create it
#docker network create --subnet=172.19.0.0/16 adapt-darknet
docker run --network=adapt-darknet --ip 172.19.0.22 --name=adapt-mysql1 -d mysql/mysql-server:5.7

#this is the ip the mysql server will run on, it has been coded in the loopback databasource.json.
