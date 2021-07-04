FROM mhart/alpine-node:14.15
WORKDIR /app
COPY package.json /app/
RUN yarn
COPY . /app/
EXPOSE 3000
CMD ["yarn", "start"]
