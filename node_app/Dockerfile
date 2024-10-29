FROM node:16

WORKDIR /app
COPY package*.json ./

RUN npm config set registry http://registry.npmjs.org/ --strict-ssl false
RUN npm cache clean --force && npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
