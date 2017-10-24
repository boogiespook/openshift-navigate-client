This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Prerequisites
Install Node.js version 6.9.1

## Running
npm run start

## Building for Prod
npm run build


# Docker Commands
docker build -t navigate-client .

# detached
docker run -d -p 8080:8080 navigate-client

# foreground
docker run -p 8080:8080 navigate-client