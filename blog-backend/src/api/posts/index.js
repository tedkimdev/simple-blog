const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read);

posts.post('/', postsCtrl.checkLogin, postsCtrl.write);
posts.delete('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId, postsCtrl.remove);
// posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId, postsCtrl.update);

// const printInfo = (ctx) => {
//   ctx.body = {
//     method: ctx.method,
//     path: ctx.path,
//     params: ctx.params,
//   };
// };

// posts.get('/', printInfo);
// posts.post('/', printInfo);
// posts.get('/:id', printInfo);
// posts.delete('/:id', printInfo);
// posts.put('/:id', printInfo);
// posts.patch('/:id', printInfo);

module.exports = posts;