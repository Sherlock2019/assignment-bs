# Use an official Node runtime as a parent image (specify the version you need)
FROM node:18.17.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build your Next.js project
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
