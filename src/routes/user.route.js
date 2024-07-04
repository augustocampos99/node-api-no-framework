import { once } from "events";
import User from "../entities/user.js";
import { JSON_HEADER } from "../utils/util.js";


const routes = (userService) => ({
  '/users:get': async (request, response) => {
    response.writeHead(200, JSON_HEADER);
    response.write(JSON.stringify(await userService.getAll()));
    response.end();
  },
  '/users:post': async (request, response) => {
    const data = await once(request, 'data');
    const userRequest = JSON.parse(data);
    const user = new User(userRequest.name, userRequest.email, userRequest.phone);
    const guid = user.guid;

    await userService.create(user)
    
    response.writeHead(201, JSON_HEADER);
    response.write(JSON.stringify({
      guid,
      success: 'User created!'
    }));

    response.end();
  },
});

export { routes };