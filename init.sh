#!/bin/bash
docker exec -it mysql_container mysql -uroot -p password -e "CREATE DATABASE IF NOT EXISTS hamsder;"
mysql -u root -h 127.0.0.1 -p < init.sql
echo "hamsder database initialized!"