FROM node:6.10.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install global npm packages
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install roadhog@0.6.0-beta.6

## Install node dependencies
COPY package.json /usr/src/app
RUN cnpm install

# Copy application source code
COPY . /usr/src/app/

EXPOSE 8000

# Entry point
CMD ["npm", "start"]
