const http = require('http');
const fs = require('fs');
const path = require('path');

const getUsers = () => {
  const filePath = path.join(__dirname, './data/users.json');
  return fs.readFileSync(filePath, 'utf8');
}

const server = http.createServer((request, response) => {
  const url = new URL(`http://localhost${request.url}`);
  const searchParams = url.searchParams;

  if (searchParams.has('hello')) {
    const name = searchParams.get('hello');
    if (!name) {
      response.writeHead(400, { 'Content-Type': 'text/plain' });
      response.end('Enter a name');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(`Hello, ${name}!`);
    }
  } else if (searchParams.has('users')) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(getUsers());
  } else {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello, World!');
  }
});

server.listen(3000, () => {
  console.log('Сервер запущен по адресу http://127.0.0.1:3000/');
});
