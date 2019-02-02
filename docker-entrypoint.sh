#!/bin/bash

echo "fetching latest backend code from github"
git fetch
git pull
echo "changing into app directory"
cd adapt
sudo npm install
echo "migrating models from loopback to database"
node ./server/create-lb-tables.js
echo "running adapt on local server"
node .
