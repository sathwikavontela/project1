# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the React project
RUN npm run build

# Install a simple HTTP server
RUN npm install -g serve

# Expose frontend port
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "build"]
