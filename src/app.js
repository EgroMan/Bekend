const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const getUsers = require('./modules/users');

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const queryParams = parsedUrl.query;

  if (queryParams.hello) {
    if (queryParams.hello === '') {
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.end('Enter a name');
    } else {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(`Hello, ${queryParams.hello}!`);
    }
  } else if (queryParams.users) {
    if (queryParams.users === '') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(getUsers());
    } else {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end();
    }
  } else if (request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello, World!');
  } else {
    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.end();
  }
});

server.listen(3000, () => {
  console.log('Сервер запущен по адресу http://127.0.0.1:3000/');
});
