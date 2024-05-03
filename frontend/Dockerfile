# Use an official Node runtime as a parent image
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
# Utilizing cache layers to speed up builds unless package.json changes
RUN npm install

# Bundle app source by copying all source files
COPY . .

# Build your Next.js project, assuming npm script is set up in package.json
RUN npm run build

# Expose the port the app runs on, useful for documentation (does not actually publish the port)
EXPOSE 3000

# Define environment variable, optional: customize based on your app's needs
ENV NODE_ENV production

# Start the Next.js app
CMD ["npm", "start"]
