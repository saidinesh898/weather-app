FROM node:16-slim

WORKDIR /
COPY package.json ./
RUN npm install


COPY . /
CMD ["npm","start"]


