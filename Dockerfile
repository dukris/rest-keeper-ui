FROM node:alpine
WORKDIR /usr/app/front
EXPOSE 4200
COPY ./ ./
RUN npm install
CMD ["npm", "start"]