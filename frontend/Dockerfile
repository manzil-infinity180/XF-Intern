# Official Image using node 20 alphine
FROM node:20-alpine  

# working directory 
WORKDIR /app/fronted

# Changes in package* . json file 
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy all changes on fronted
COPY . .

# expose the app on port 5173
EXPOSE 5173

# Start your frontend application
CMD [ "npm", "run", "dev","--", "--host", "0.0.0.0"]