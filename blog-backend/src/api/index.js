const Router = require('koa-router');
const posts = require('./posts');

const api = new Router();

api.use('/posts', posts.routes());

// api.get('/test', (ctx) => {
//   ctx.body = 'test Success';
// });

// // Setting Router
// api.get('/', (ctx) => {
//   ctx.body = 'Home';
// });

// api.get('/about/:name?', (ctx) => {
//   const { name } = ctx.params;
//   ctx.body = name ? `About ${name}` : 'About';
// });

// api.get('/posts', (ctx) => {
//   const { id } = ctx.query;
//   ctx.body = id ? `post #${id}` : 'No Post ID';
// });


module.exports = api;