# Use Node.js 20.18.0 based on Debian Bullseye Slim
FROM node:20.18.0-bullseye-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose the app port (adjust as needed)
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
