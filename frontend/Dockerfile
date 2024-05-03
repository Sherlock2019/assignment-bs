<<<<<<< HEAD
# Use an official Node runtime as a parent image
FROM node:lts-alpine
=======
# Use an official Node runtime as a parent image (specify the version you need)
FROM node:18.17.0
>>>>>>> efb370549b15432c5c98d75886a460616a5cf435

# Set the working directory
WORKDIR /usr/src/app

<<<<<<< HEAD
# Install Next.js
COPY package*.json ./
=======
# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
>>>>>>> efb370549b15432c5c98d75886a460616a5cf435
RUN npm install

# Bundle app source
COPY . .

<<<<<<< HEAD
# Build the project
RUN npm run build

# Start the app
=======
# Build your Next.js project
RUN npm run build

# Start the Next.js app
>>>>>>> efb370549b15432c5c98d75886a460616a5cf435
CMD ["npm", "start"]
