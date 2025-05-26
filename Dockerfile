# Use Node.js 20.18.0 based on Debian Bullseye Slim
FROM node:20.18.0-bullseye-slim

# Set working directory
WORKDIR /usr/src/app

# Install some "random" outdated dependencies for Renovate test
RUN npm install -g lodash@4.17.10 uuid@3.4.0

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose the app port
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
