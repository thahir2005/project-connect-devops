# Base image
FROM node:18

# Working directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest code
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "index.js"]
