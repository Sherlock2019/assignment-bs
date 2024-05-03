# Use an official Node runtime as a parent image
<<<<<<< HEAD
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript project
RUN npx tsc

# Start the server
CMD ["node", "build/server.js"]
=======
FROM node:18.17.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD ["node", "src/app.js"]
>>>>>>> efb370549b15432c5c98d75886a460616a5cf435
