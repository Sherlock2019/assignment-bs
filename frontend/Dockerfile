# Use an official Node runtime as a parent image
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install Next.js
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the project
RUN npm run build

# Start the app
CMD ["npm", "start"]
