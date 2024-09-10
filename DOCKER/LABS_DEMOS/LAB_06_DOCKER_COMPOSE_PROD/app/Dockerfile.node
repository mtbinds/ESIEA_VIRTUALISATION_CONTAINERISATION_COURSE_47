# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory
WORKDIR /home/node

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
