#!/bin/bash

echo "changing into app directory"
cd adapt
sudo npm install
echo "running adapt on local server"
node .
