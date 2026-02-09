# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json and install dependencies
# We do this first to leverage Docker's layer caching
COPY backend/package*.json ./
RUN npm install

# Copy TypeScript source code and tsconfig
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Build the TypeScript code
RUN npm run build

# Copy .env for production environment (handle securely in real app, e.g., Kubernetes secrets)
# For local development with docker-compose, this is fine.
COPY backend/.env ./

# Expose the port the app runs on
EXPOSE 5000

# Run the compiled JavaScript application
CMD [ "npm", "start" ]