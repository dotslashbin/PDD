FROM node:14.15.5

# Setting up where the app resides
WORKDIR /usr/src/app

ENV PORT=3001
ENV MONGOURL=mongodb://localhost:27017/pdd

# Dependency references
COPY package.json ./
COPY package-lock.json ./

# Insetalling dependencies
RUN npm install
RUN npm ci --only=production

# Copying files
COPY build/. .
RUN npm install pm2 -g

# Setting up runtime
EXPOSE 3001
CMD ["pm2-runtime", "app.js"]