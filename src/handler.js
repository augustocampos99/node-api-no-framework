import { parse } from 'node:url';
import { JSON_HEADER } from './utils/util.js';
import { routes } from './routes/user.route.js';
import UserService from './services/user.service.js';

const userService = new UserService();
const userRoutes = routes(userService);

const routeList = {
  ...userRoutes,
  '/:get': async (request, response) => {
    response.write('GET home');
    response.end();
  },
  default: (request, response) => {
    response.writeHead(404, JSON_HEADER);
    response.write('404');
    response.end();
  }
}

function handler (request, response) {
  // Destructuring request objects
  const {
    url,
    method
  } = request;

  const {
    pathname
  } = parse(url, true)


  // get route and method
  const endpoint = `${pathname}:${method.toLowerCase()}`;
  const chosen = routeList[endpoint] || routeList.default;

  return Promise.resolve(chosen(request, response))
  .catch(handlerError(response));
}

function handlerError(response) {
  return error => {
    console.log('Error: ', error.stack);
    response.writeHead(500, JSON_HEADER);
    response.write(JSON.stringify({ error: 'Internal server error =(' }));
  }
}

export default handler;