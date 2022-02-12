const mongoose = require("mongoose");

// import models
const { User, Thought } = require("../models");

// import seed data
const users = require("./data/users");
const thoughts = require("./data/thoughts");

const init = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/socialNetworkDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("[INFO]: Database connection successful");

    await User.deleteMany({});
    await User.insertMany(users);

    console.log("[INFO]: Successfully seeded users");

    await Thought.deleteMany({});
    await Thought.insertMany(thoughts);

    console.log("[INFO]: Successfully seeded thoughts");

    const usersFromDb = await User.find({});
    const thoughtsFromDb = await Thought.find({});

    // seed thoughts with users
    const thoughtPromises = thoughtsFromDb.map(async (thought) => {
      const username = thought.username;

      const user = usersFromDb.find((user) => user.username === username);

      user.thoughts.push(thought._id.toString());

      await User.findByIdAndUpdate(user._id, { ...user });
    });
    // get array of all user ids
    const userIdsArray = usersFromDb.map((user) => user._id);

    // assign random friends to users
    const friendsPromises = usersFromDb.map(async (user) => {
      const shuffledUserIds = userIdsArray.sort(() => 0.5 - Math.random());
      const slicedArray = shuffledUserIds.slice(
        Math.floor(Math.random() * shuffledUserIds.length)
      );

      const friends = slicedArray.filter((userId) => userId !== user._id);
      // update users with friends arrays
      await User.findByIdAndUpdate(user._id, { friends });
    });

    await Promise.all(thoughtPromises);
    await Promise.all(friendsPromises);

    await mongoose.disconnect();
  } catch (error) {
    console.log(`[ERROR]: Database connection failed | ${error.message}`);
  }
};

init();
