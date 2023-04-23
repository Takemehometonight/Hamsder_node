#!/bin/bash

# Run the MySQL container
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql

# Wait for the MySQL server to start
echo "Waiting for MySQL server to start..."
while ! docker exec mysql-container mysqladmin ping --silent &>/dev/null; do
    sleep 1
done
echo "MySQL server started!"

