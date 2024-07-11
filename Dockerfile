# Stage build
FROM node:20-alpine AS build

WORKDIR /app

# Copy only necessary files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy files for building the SvelteKit app (dockerignore will ignore unnecessary files)
COPY . .

# build SvelteKit app
RUN npm run build

# stage run
FROM node:20-alpine

WORKDIR /app

# Copy dependency list
COPY --from=build /app/package*.json ./

# clean install dependencies, no devDependencies, no prepare script
RUN npm ci --production --ignore-scripts

# copy built SvelteKit app to /app
COPY --from=build /app/build ./

ENV PORT=3000
ENV NODE_ENV=production
CMD ["node", "./index.js"]