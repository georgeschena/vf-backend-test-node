# vf-backend-test-node

## How to install and run

- `npm install`
- Run tests `npm test`
- Run app `node server.js`

## My thoughts and further ideas

- For better readability and extendability I separated out the routing and controller logic
- If we used a real database the controller which houses the `getProductById` method would make the call to the database.
- The `server.js` file is now clean and only refers to the routes.
- If I had more time I would have extracted out more of the logic from the routes into some use cases which would
follow some of the SOLID pricnicples.
