FROM ubuntu
RUN apt-get update && apt-get -y install nodejs nodejs-legacy npm git
RUN git clone https://github.com/sigit-prayoga/learn-nodejs.git
ARG CACHEBUST=1
RUN cd learn-nodejs && npm install
#CMD ["node", "index.js"]
