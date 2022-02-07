const mongoose = require("mongoose");

// import models
const { User, Thought } = require("../models");

// import seed data
const users = require("./data/users");
const thoughts = require("./data/thoughts");
const { format } = require("date-fns/format");

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

    // seed all users
    await User.insertMany(users);
    console.log("[INFO]: Successfully seeded users.");

    // const testThought = new Thought({
    //   thoughtText: "I'm just a friendly neighborhood Spider-Man.",
    //   username: "peterParker",
    //   reactions: [
    //     {
    //       reactionBody: "Please! You've been to space!",
    //       username: "natashaRomanoff",
    //     },
    //     {
    //       reactionBody: "That was an accident!",
    //       username: "peterParker",
    //     },
    //     {
    //       reactionBody: "You're the next Iron Man.",
    //       username: "steveRogers",
    //     },
    //   ],
    // });
    // console.log(testThought);

    // seed all thoughts
    await Thought.insertMany(thoughts);
    console.log("[INFO]: Successfully seeded thoughts.");

    // get all thoughts and users from DB for linking
    const thoughtsFromDB = await Thought.find({});
    console.log("Thoughts from DB:", thoughtsFromDB);
    const usersFromDB = await User.find({});

    const thoughtUsers = thoughtsFromDB.map((thought) => {
      // get thought's username and _id
      const thoughtUsername = thought.username;
      const thoughtId = thought._id;

      //   find user object matching thought's username
      const thoughtUser = usersFromDB.find(
        (user) => user.username === thoughtUsername
      );

      //   insert thought _id into user's thoughts array
      thoughtUser.thoughts.push(thoughtId);

      return thoughtUser;
    });

    // add users without thoughts + with thoughts
    const allUsers = [
      ...thoughtUsers,
      {
        username: "natashaRomanoff",
        email: "blackwidow@email.com",
      },
    ];

    // delete previous user documents, replace with transformed data
    await User.deleteMany({});
    await User.insertMany(allUsers);

    await mongoose.disconnect();
  } catch (error) {
    console.log(`[ERROR]: Database connection failed | ${error.message}`);
  }
};

seed();
