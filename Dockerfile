FROM node:latest
ADD . /app
WORKDIR /app
RUN npm ci
CMD ["node", "main.js"]