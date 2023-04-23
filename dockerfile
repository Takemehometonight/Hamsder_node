# Base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 5000

#set up environmental variables for potential cloud sql connection
# export GOOGLE_APPLICATION_CREDENTIALS=sql-key.json
# export INSTANCE_CONNECTION_NAME='hamsder:us-west1:hamsder-1'
# export DB_USER='root'
# export DB_PASS=''
# export DB_NAME='hamsder'

#./cloud-sql-proxy hamsder:us-west1:hamsder-1