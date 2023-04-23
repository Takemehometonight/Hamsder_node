#!/bin/bash

# Download the MySQL Docker image
docker pull mysql

# Run the MySQL container
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=your_password -p 3306:3306 mysql

# Wait for the MySQL server to start
echo "Waiting for MySQL server to start..."
while ! docker exec mysql mysqladmin ping --silent &>/dev/null; do
    sleep 1
done
echo "MySQL server started!"

# Create the hamsder database
docker exec -it mysql mysql -uroot -p your_password -e "CREATE DATABASE hamsder;"

# Initialize the hamsder database with init.sql
docker cp /home/ericfang/lahacks/Hamsder_node/init.sql mysql:/init.sql
docker exec -it mysql mysql -uroot -p your_password hamsder < /init.sql

echo "Database initialized!"
