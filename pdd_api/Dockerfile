FROM node:14.15.5

# Setting up where the app resides
WORKDIR /usr/src/app

# Dependency references
COPY package.json ./
COPY package-lock.json ./

# Insetalling dependencies
RUN npm install
RUN npm ci --only=production

# Copying files
COPY dist/. .
RUN npm install pm2 -g

# Setting up runtime
EXPOSE 3000
CMD ["pm2-runtime", "app.js"]