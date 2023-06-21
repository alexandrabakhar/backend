const http = require('http');
const getUsers = require('./modules/users');

const { hostname } = require('os');

const server = http.createServer((request, response) => {
	const url = new URL(request.url, 'http://127.0.0.1');
	const params = url.searchParams;

	if (!params.toString().length) {
		response.statusCode = 200;
		response.statusMessage = 'OK';
		response.setHeader('Content-Type', 'text/plain');
		response.write('Hello, World!');
		response.end();

		return;
	}

	if (params.get('hello') === 'Ivan') {
		response.status = 200;
		response.statusMessage = 'OK';
		response.header = 'Content-Type: text/plain';
		response.write('Hello, Ivan!');
		response.end();

		return;
	}

	for (let [key, value] of params.entries()) {
		switch (key) {
			case 'users':
				response.statusCode = 200;
				response.statusMessage = 'OK';
				response.setHeader('Content-Type', 'application/json');
				response.write(getUsers());
				response.end();

				break;

			case 'hello':
				if (value) {
					response.statusCode = 200;
					response.statusMessage = 'OK';
					response.setHeader('Content-Type', 'text/plain');
					response.write(`Hello, ${value}`);
					response.end();
				} else {
					response.statusCode = 400;
					response.setHeader('Content-Type', 'text/plain');
					response.write('Enter a name');
					response.end();
				}

				break;
			default:
				response.statusCode = 500;
				response.setHeader('Content-Type', 'text/plain');
				response.write(' ');
				response.end();
                
				break;
		}
	}
});

server.listen((port = 3003), hostname, () => {
	console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
});
