FROM node:14-alpine

ENV NODE_ENV=production

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./dist .

EXPOSE 8000
CMD [ "node", "app.js" ]