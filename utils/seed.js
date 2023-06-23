const connection = require('../config/connection');
const { Post } = require('../models');
const {
  getRandomName,
  getRandomComments,
  getRandomPost,
  genRandomIndex,
} = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the collections if they exist
  console.log("db is open");
  let postCheck = await connection.db.listCollections({ name: 'posts' }).toArray();
  if (postCheck.length) {
    await connection.dropCollection('posts');
  }
  console.log("done with cleaning posts collection")
  
  const posts = [];

  // Makes comments array
  const makePost = (text) => {
    posts.push({
      text,
      username: getRandomName().split(' ')[0]
    });
  };

  // Wait for the comments to be inserted into the database
  // await Comment.collection.insertMany(comments);

  // For each of the comments that exist, make a random post of 10 words
  // comments.forEach(() => makePost(getRandomPost(10)));
  for (let index = 0; index < 10; index++) {
    makePost(getRandomPost(10));
  }
  

  // Wait for the posts array to be inserted into the database
  await Post.collection.insertMany(posts);

  // Log out a pretty table for comments and posts
  // console.table(comments);
  console.table(posts);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
