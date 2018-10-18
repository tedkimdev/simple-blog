const { ObjectId } = require('mongoose').Types;
exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  if(!ObjectId.isValid(id)) {
    ctx.status = 400;
    return null;
  }

  return next();
};

const Post = require('models/post');
const Joi = require('joi');

/* POST /api/posts
  { title, body, tags }
*/
exports.write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  });
  
  const result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    title, body, tags
  });

  try {
    await post.save();
    ctx.body = post;
  } catch(e) {
    ctx.throw(e, 500);
  }
};

/* GET /api/posts
*/
exports.list = async (ctx) => {
  const page = parseInt(ctx.query.page || 1, 10);
  const { tag } = ctx.query;

  const query = tag ? {
    tags: tag
  } : {};

  if(page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find(query)
      .sort({_id: -1})
      .limit(10)
      .skip((page - 1) * 10)
      .lean() // convert to JSON
      .exec();
    const postCount = await Post.count(query).exec();
    
    const limitBodyLength = post => ({
      ...post,//.toJSON(),
      body: post.body.length < 350 ? post.body : `${post.body.slice(0,350)}...`
    });
    ctx.body = posts.map(limitBodyLength);
    ctx.set('Last-Page', Math.ceil(postCount / 10));
  } catch(e) {
    ctx.throw(e, 500);
  }
};

/* GET /api/posts/:id
*/
exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    
    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch(e) {
    ctx.throw(e, 500);
  }
};

/* DELETE /api/posts/:id
*/
exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndRemove(id).exec();

    if(!post) {
      ctx.status = 404;
      return;
    }

    ctx.status = 204;
  } catch(e) {
    ctx.throw(e, 500);
  }
};

/* PATCH /api/posts/:id
  { title, body, tags }
*/
exports.update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,  //return new updated post
    }).exec();

    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch(e) {
    ctx.throw(e, 500);
  }
};

// let postId = 1;

// const posts = [
//   {
//     id: 1,
//     title: 'title',
//     body: 'contents'
//   }
// ];

// /*
//   WRITE POST
//   POST /api/posts
//   { title, body }
// */

// exports.write = (ctx) => {
//   const {
//     title,
//     body
//   } = ctx.request.body;

//   postId += 1;

//   const post = { id: postId, title, body };
//   posts.push(post);
//   ctx.body = post;
// };

// /**
//  * Posts list
//  * GET /api/posts
//  */
// exports.list = (ctx) => {
//   ctx.body = posts;
// };

// /**
//  * Read Post by ID
//  * GET /api/posts/:id
//  */

// exports.read = (ctx) => {
//   const { id } = ctx.params;

//   const post = posts.find(p => p.id.toString() === id);

//   if (!post) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'There is no post'
//     };
//     return;
//   }
//   ctx.body = post;
// };

// /**
//  * Delete post
//  * DELETE /api/posts/:id
//  */

// exports.remove = (ctx) => {
//   const { id } = ctx.params;

//   const index = posts.findIndex(p => p.id.toString() === id);

//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'There is no post'
//     };
//     return;
//   }

//   posts.splice(index, 1);
//   ctx.status = 204; // No Content
// };

// /**
//  * Update Post(Replace)
//  * PUT api/posts/:id
//  * { title, body }
//  */
// exports.replace = (ctx) => {
//   const { id } = ctx.params;

//   const index = posts.findIndex(p => p.id.toString() === id);

//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'There is no post'
//     };
//     return;
//   }

//   posts[index] = {
//     id,
//     ...ctx.request.body
//   };
//   ctx.body = posts[index];
// };

// /**
//  * Update Post(Update fields)
//  * PATCH /api/posts/:id
//  * { title, body }
//  */
// exports.update = (ctx) => {
//   const { id } = ctx.params;

//   const index = posts.findIndex(p => p.id.toString() === id);

//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'There is no post'
//     };
//     return;
//   }

//   posts[index] = {
//     ...posts[index],
//     ...ctx.request.body
//   };

//   ctx.body = posts[index];
// };
