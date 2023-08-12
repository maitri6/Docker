
FROM node:14-alpine




WORKDIR /app

COPY package.json  ./

RUN npm install




#RUN npm rebuild bcrypt 



COPY . .

EXPOSE 3003


CMD ["node","app.js"]
