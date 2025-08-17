# CRAIViz Production Dockerfile
FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y jq

COPY . .

RUN npm install

EXPOSE 3000
EXPOSE 4000

CMD ["npm", "start"]
