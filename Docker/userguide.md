# How to deploy our ETH price Gas tracker  FE and BE on Docker Containers  

# Step 1: 
Create a Dockerfile The Dockerfile specifies the environment in which your app will run. It defines what operating system will be used, what software packages will be installed, and what commands will be run. Here's a basic example of a Dockerfile for a Node.js application:

# Dockerfile

```
# Use an official Node runtime as a parent image
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


```

Make sure to replace src/app.js with the path to your main application file.

# Step 2:
 Create a docker-compose.yml File Docker Compose allows you to configure and run your Docker applications. A docker-compose.yml file is used to define the services, networks, and volumes for a Docker application. Here's how you can define one for your Node.js app:

```
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules



```

This configuration builds the Docker image using the Dockerfile in the current directory. Maps port 3000 on the host to port 3000 on the container, allowing access to the app from outside the container. Sets the environment variable NODE_ENV to production. Uses volumes to mount the code into the container, which is useful for development since it allows changes to be reflected immediately. It also mounts node_modules from within the container to avoid overwriting it with the local node_modules directory, which might be incompatible if your local environment differs from the container.

# Step 3:

 Running Docker Compose To build and start your application using Docker Compose, run the following command in the directory containing your docker-compose.yml file:

```
docker-compose up --build

```

This command builds the image if it does not exist and starts the container. The --build flag is used to ensure that any changes to the Dockerfile are incorporated into the image.

# Step 4: 

Verifying the Deployment After running Docker Compose, you should see logs that indicate that the server is running and listening on the specified port. You can verify that the application is running properly by accessing it at  [http://localhost:3000](http://localhost:3000/)  in your web browser or using a tool like curl.

Cleanup When you're done, you can stop and remove the containers, networks, or volumes created by Docker Compose using:

```
docker-compose down
```

![image](https://github.com/Sherlock2019/assignment-bs/assets/36204380/58434e79-dcaf-4169-9302-4a4b6ff5ab06)

