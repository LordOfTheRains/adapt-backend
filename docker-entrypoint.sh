#!/bin/bash

echo "checking Node version"
node --version

echo "end of Docker entrypoint script"

#Installing Loopback
npm install -g loopback-cli
npm install loopback-connector-mysql --save
