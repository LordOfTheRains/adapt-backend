#!/bin/bash

git pull
echo "changing into app directory"
cd adapt
npm install
echo "running adapt on local server"
node .
