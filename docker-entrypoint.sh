#!/bin/bash

echo "fetching latest backend code from github"
git fetch
git pull https://github.com/LordOfTheRains/adapt-backend.git
echo "changing into app directory"
cd adapt
sudo npm install
echo "migratijng models from loopback to database"
node ./server/create-lb-tables.js
echo "running adapt on local server"
node .
