FROM node:14
ADD . /app
WORKDIR /app
RUN npm ci
CMD ["node", "main.js"]