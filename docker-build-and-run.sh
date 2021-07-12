#!/bin/bash
cd `dirname "$0"`
docker stop ldb
docker rm ldb
docker build -t ledlamp/lampdiscordbot .
docker run -d --name ldb --restart=unless-stopped --env-file=secrets.env -v /srv/www/ldb/:/srv/www/ldb/ ledlamp/lampdiscordbot