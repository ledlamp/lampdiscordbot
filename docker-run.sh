#!/bin/bash
cd `dirname "$0"`
docker run -d --name ldb --restart=unless-stopped -v `pwd`:/app -w /app node:latest node main.js