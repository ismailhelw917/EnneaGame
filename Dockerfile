# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Set production environment
ENV NODE_ENV=production

# Start the server
CMD ["npm", "start"]
