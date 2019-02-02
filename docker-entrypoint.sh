#!/bin/bash

git fetch
git pull https://github.com/LordOfTheRains/adapt-backend.git
echo "changing into app directory"
cd adapt
sudo npm install
echo "running adapt on local server"
node .
