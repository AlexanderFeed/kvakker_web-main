FROM node:16.15.1
COPY ["package.json", "./"]
ARG NODE_OPTIONS=--max-old-space-size=8192
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
RUN npm cache clean --force
COPY . .
#RUN yarn build
CMD npm run serve