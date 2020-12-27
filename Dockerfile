FROM node:14

WORKDIR /usr/local/dev/jefer.js

COPY package.json ./

RUN npm install

COPY . .

CMD [ "node", "src/app.js" ]
