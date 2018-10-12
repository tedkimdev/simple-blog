const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Post', Post);

/**
 * Schema Example
 */

// const Author = new Schema({
//   name: String,
//   email: String
// });

// const Book = new Schema({
//   title: String,
//   description: String,
//   authors: [Author],
//   meta: {
//     likes: Number
//   },
//   extra: Schema.Types.Mixed // any type data
//   //buffer: Buffer // Buffer can contain files
// });
