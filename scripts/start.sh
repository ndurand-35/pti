#!/bin/sh

mkdir -p tmp
node ace migration:run --force
cd bin
node server.js