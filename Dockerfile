FROM node:18-alpine as module-install-stage
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
 
COPY package.json /app/package.json
 
RUN apk add yarn
RUN yarn install
 
# build
FROM node:18-alpine as build-stage
COPY --from=module-install-stage /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
RUN yarn build
 
# serve
FROM node:18-alpine
COPY --from=build-stage /app/dist/ /app/dist
RUN npm install -g serve
# start app
CMD serve -s /app/dist -l 3000