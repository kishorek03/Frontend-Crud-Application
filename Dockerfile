FROM node:20-alpine
WORKDIR /my-app
COPY package.json ./
RUN npm install
COPY . .
COPY public/ /my-app/public
EXPOSE 3000
CMD ["npm", "start"]
