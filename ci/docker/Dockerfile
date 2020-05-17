FROM mhart/alpine-node:12.5.0

RUN npm install yarn -g

COPY package.json /src/package.json
WORKDIR /src

RUN yarn --production

COPY . /src

EXPOSE 8080

CMD npm start
