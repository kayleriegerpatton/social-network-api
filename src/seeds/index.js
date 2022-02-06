const mongoose = require("mongoose");

// import models
const { User, Thought } = require("../models");

// import seed data
const users = require("./data/users");
const thoughts = require("./data/thoughts");

const seed = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/socialNetworkDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("[INFO]: Database connection successful.");

    // delete any current users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Step 1 seed all users
    await User.insertMany(users);
    console.log("[INFO]: Successfully seeded users.");

    // Step 2 seed all thoughts
    await Thought.insertMany(thoughts);
    console.log("[INFO]: Successfully seeded thoughts.");

    // Step 3 get all thoughts from DB
    const thoughtsFromDB = await Thought.find({});
    console.log("Thoughts:", thoughtsFromDB);

    // * FINISH THIS
    // thoughtsFromDB.map(() => {});
    // Step 4 map through the thoughts and link each thought the specific user (get the username of the thought and find the user object in users from DB and get _id of that user)
    // once you get _id of user, insert the thought _id in to the thoughts array of the user

    // map through thoughts, for each thought object get users from db & compare with thought.username; if === then

    await mongoose.disconnect();
  } catch (error) {
    console.log(`[ERROR]: Database connection failed | ${error.message}`);
  }
};

seed();
