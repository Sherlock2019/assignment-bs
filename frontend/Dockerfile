
# Use an official Node runtime as a parent image
FROM node:lts-alpine


# Set the working directory
WORKDIR /usr/src/app


# Install Next.js
COPY package*.json ./


# Install dependencies

RUN npm install

# Bundle app source
COPY . .

# Build your Next.js project
RUN npm run build

# Start the Next.js app

CMD ["npm", "start"]
