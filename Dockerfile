# Use Node.js 20.18.0 based on Debian Bullseye Slim
FROM node:20.18.0-bullseye-slim@sha256:8316459380d7c3a02de5a7994130757f0d8d57872301efeef3c42a0ba2d4e5fb

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
