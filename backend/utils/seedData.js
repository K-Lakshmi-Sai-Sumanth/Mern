const axios = require("axios");
const Post = require("../models/Post");
const User = require("../models/User");
const Todo = require("../models/Todo");

module.exports = async () => {

  const userCount = await User.countDocuments();

  if (userCount > 0) {
    console.log("Data already seeded");
    return;
  }

  const [postsRes, usersRes, todosRes] = await Promise.all([
    axios.get("https://jsonplaceholder.typicode.com/posts"),
    axios.get("https://jsonplaceholder.typicode.com/users"),
    axios.get("https://jsonplaceholder.typicode.com/todos")
  ]);

  const users = usersRes.data.map(user => ({
    ...user,
    password: ""   // add empty password
  }));

  await User.insertMany(users);
  await Post.insertMany(postsRes.data);
  await Todo.insertMany(todosRes.data);

  console.log("Seeded users, posts and todos");
};