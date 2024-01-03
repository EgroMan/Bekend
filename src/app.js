const http = require('http');
const getUsers = require('./modules/users.js')

const server = http.createServer((request, response) => {
  const url = new URL(`http://localhost${request.url}`);
  const searchParams = url.searchParams;

  for (const key of searchParams.keys()) {
    // Here you can add the logic to check if the parameter is not equal to any of the existing ones
    if (key !== 'hello' && key !== 'users') {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end(`Parameter ${key} is not supported`);
      return;
    }
  }

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

server.listen(3003, () => {
  console.log('Server is running at http://127.0.0.1:3003/');
});
