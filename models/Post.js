const { Schema, model } = require('mongoose');

// Schema to create Post model
const postSchema = new Schema(
  {
    text: String,
    username: String,
    // comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Initialize our Post model
const Post = model('post', postSchema);

module.exports = Post;
