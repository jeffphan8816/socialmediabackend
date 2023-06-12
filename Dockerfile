# Use an official Node.js runtime as the base image
FROM node:14 as build-stage

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port your Express.js app listens on
EXPOSE 3001

# Set the environment variables for MongoDB connection
ENV MONGO_URL='mongodb+srv://propepsino1:bWbYH8yBbNe7P4RA@cluster0.j596xsc.mongodb.net/?retryWrites=true&w=majority'
ENV JWT_SECRET='secret'
ENV PORT=3001


# Install PM2 globally
RUN npm install pm2 -g

# Start your Express.js app with PM2
CMD ["pm2-runtime", "start", "index.js", "--name", "socialapp-backend"]