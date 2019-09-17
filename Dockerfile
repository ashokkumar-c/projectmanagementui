FROM node:12.2.0

#create working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

# start app
CMD ng serve