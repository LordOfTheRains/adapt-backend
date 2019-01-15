#!/bin/bash

echo "checking Node version"
node --version

echo "end of Docker entrypoint script"

#Installing Loopback
sudo npm install -g loopback-cli
sudo npm install loopback-connector-mysql --save
