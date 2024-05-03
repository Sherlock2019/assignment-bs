
# Use an official Node runtime as a parent image
FROM node:lts-alpine


# Set the working directory
WORKDIR /usr/src/app


# Install Next.js
COPY package*.json ./
=======
# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies

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

CMD ["npm", "start"]
