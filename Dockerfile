# frontend/Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy project files
COPY . .

# Expõe a porta que o React usará
EXPOSE 3000

# Build the app
RUN npm run build

# Command to run the app (serve)
CMD ["npm", "start"]
