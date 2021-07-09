#!/bin/bash
cd `dirname "$0"`
docker run -d --name ldb -v `pwd`:/app -w /app node:latest node main.js