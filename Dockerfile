FROM node:14

WORKDIR /usr/local/dev/paycedcbot.js

COPY package.json ./

RUN npm install

COPY . .

CMD [ "node", "src/app.js" ]
