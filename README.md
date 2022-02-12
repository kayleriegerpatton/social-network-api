# Social Network API ![MIT](https://img.shields.io/static/v1?label=MIT&message=License&color=blueviolet)

## Table of Contents

- [Description](#description)
  - [Technologies](#technologies)
- [Endpoints](#endpoints)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Seeding](#seeding)
  - [Usage](#usage)
- [Questions](#questions)
- [License](#license)
- [Screenshots](#screenshots)

## Description

This back-end Node.js application uses an Express.js server and a MongoDB database through the Mongoose package.

The database contains 2 collections, users and thoughts, and the api queries each with 7 endpoints including 4 which interact with 'reaction' and 'friends' subdocuments.

### Technologies

- Javascript
- Node.js
- Express.js server
- MongoDB database
- Mongoose

## Endpoints

### `POST /api/{users|thoughts}`

- creates a new document by type

Request body example (thought):

```json
{
  "thoughtText": "I miss Tony.",
  "username": "peterParker",
  "userId": "620443d3379bf317e635a4c9"
}
```

Sample response:

```json
{
  "success": true,
  "data": {
    "thoughtText": "I miss Tony.",
    "username": "peterParker",
    "_id": "62081c1f3ed09f24ee90e90f",
    "createdAt": "Saturday February 12th, 2022 @ 08:44:15 p.m.",
    "reactions": [],
    "__v": 0,
    "reactionCount": 0,
    "id": "62081c1f3ed09f24ee90e90f"
  }
}
```

### `PUT /api/{users|thoughts}/:id`

- updates a document by id

Request body example (user):

```json
{
  "username": "tonyStark",
  "email": "IAMironman@email.com"
}
```

Sample response:

```json
{
  "success": true,
  "data": {
    "_id": "62081ce13ed09f24ee90e913",
    "username": "tonyStark",
    "email": "IAMironman@email.com",
    "thoughts": [],
    "friends": [],
    "__v": 0,
    "friendCount": 0,
    "id": "62081ce13ed09f24ee90e913"
  }
}
```

### `DELETE api/{users|thoughts}/:id`

- deletes a document by id

Sample response (thought):

```json
{
  "success": true,
  "data": {
    "_id": "62081c1f3ed09f24ee90e90f",
    "thoughtText": "I miss Tony.",
    "username": "peterParker",
    "createdAt": "Saturday February 12th, 2022 @ 08:44:15 p.m.",
    "reactions": [],
    "__v": 0,
    "reactionCount": 0,
    "id": "62081c1f3ed09f24ee90e90f"
  }
}
```

### `GET api/{users|thoughts}`

- returns a list of all documents by type, along with associated schemas (friends related to users, reactions related to thoughts)

Sample response (thoughts):

```json
{
  "success": true,
  "data": {
    "_id": "620443d4379bf317e635a4d4",
    "thoughtText": "I'm just a friendly neighborhood Spider-Man.",
    "username": "peterParker",
    "reactions": [
      {
        "reactionId": "620443d4379bf317e635a4d5",
        "reactionBody": "Please! You've been to space!",
        "username": "natashaRomanoff",
        "_id": "620443d4379bf317e635a4d6",
        "createdAt": "Wednesday February 9th, 2022 @ 10:44:36 p.m.",
        "id": "620443d4379bf317e635a4d6"
      },
      {
        "reactionId": "620443d4379bf317e635a4d7",
        "reactionBody": "That was an accident!",
        "username": "peterParker",
        "_id": "620443d4379bf317e635a4d8",
        "createdAt": "Wednesday February 9th, 2022 @ 10:44:36 p.m.",
        "id": "620443d4379bf317e635a4d8"
      },
      {
        "reactionId": "620443d4379bf317e635a4d9",
        "reactionBody": "You're the next Iron Man.",
        "username": "steveRogers",
        "_id": "620443d4379bf317e635a4da",
        "createdAt": "Wednesday February 9th, 2022 @ 10:44:36 p.m.",
        "id": "620443d4379bf317e635a4da"
      }
    ],
    "createdAt": "Wednesday February 9th, 2022 @ 10:44:36 p.m.",
    "__v": 0,
    "reactionCount": 3,
    "id": "620443d4379bf317e635a4d4"
  }
}
```

### `GET /api/{users|thoughts}/:id`

- returns a document by id

Sample response (user):

```json
{
  "success": true,
  "data": {
    "_id": "620443d3379bf317e635a4ca",
    "username": "tchallaKing",
    "email": "wakandaforever@email.com",
    "thoughts": [
      {
        "_id": "620443d4379bf317e635a4db",
        "thoughtText": "Wakanda will no longer watch from the shadows.",
        "username": "tchallaKing",
        "createdAt": "Wednesday February 9th, 2022 @ 10:44:36 p.m.",
        "reactions": [],
        "__v": 0,
        "reactionCount": 0,
        "id": "620443d4379bf317e635a4db"
      }
    ],
    "friends": [
      {
        "_id": "620443d3379bf317e635a4c7",
        "username": "steveRogers",
        "email": "cap@email.com",
        "thoughts": ["620443d4379bf317e635a4cd"],
        "friends": [],
        "__v": 0,
        "friendCount": 0,
        "id": "620443d3379bf317e635a4c7"
      }
    ],
    "__v": 0,
    "friendCount": 1,
    "id": "620443d3379bf317e635a4ca"
  }
}
```

### `POST /api/users/:userId/friends/`

- creates a new friend in the user's friends array

Request body example:

```json
{
  "_id": "620443d3379bf317e635a4c8"
}
```

Sample response:

```json
{
  "success": true,
  "data": {
    "_id": "620443d3379bf317e635a4c7",
    "username": "steveRogers",
    "email": "cap@email.com",
    "thoughts": ["620443d4379bf317e635a4cd"],
    "friends": ["620443d3379bf317e635a4c8"],
    "__v": 0,
    "friendCount": 1,
    "id": "620443d3379bf317e635a4c7"
  }
}
```

### `DELETE /api/users/:userId/friends/:friendId`

- deletes a friend from the user's friends array

### `POST /api/thoughts/:thoughtId/reactions/`

- creates a new reaction in the thought's reactions array

Request body example:

```json
{
  "reactionBody": "Let's go!",
  "username": "natashaRomanoff"
}
```

Sample response:

```json
{
  "success": true,
  "data": {
    "_id": "620443d4379bf317e635a4cd",
    "thoughtText": "Avengers! Assemble.",
    "username": "steveRogers",
    "reactions": [
      {
        "reactionId": "620443d4379bf317e635a4d2",
        "reactionBody": "Uhh...are you sure you want me to come?",
        "username": "peterParker",
        "_id": "620443d4379bf317e635a4d3",
        "createdAt": "Wednesday February 9th, 2022 @ 10:44:36 p.m.",
        "id": "620443d4379bf317e635a4d3"
      },
      {
        "reactionId": "620823c13ed09f24ee90e97d",
        "reactionBody": "Let's go!",
        "username": "natashaRomanoff",
        "_id": "620823c13ed09f24ee90e97e",
        "createdAt": "Saturday February 12th, 2022 @ 09:16:49 p.m.",
        "id": "620823c13ed09f24ee90e97e"
      }
    ],
    "createdAt": "Wednesday February 9th, 2022 @ 10:44:36 p.m.",
    "__v": 0,
    "reactionCount": 4,
    "id": "620443d4379bf317e635a4cd"
  }
}
```

### `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`

- deletes a reaction from the thought's reactions array

## Questions

To contribute to or ask questions about this project, please contact me via [email](mailto:kayle.patton22@gmail.com) or [GitHub](https://github.com/kayleriegerpatton).

## Getting Started

### Installation

Run the following script to install the application:

```
$ git clone https://github.com/kayleriegerpatton/social-network-api.git
$ cd social-network-api
$ npm install
```

### Seeding

Before starting the application, create a new "socialNetworkDB" database in MongoDB. Seed data from the command line:

```
$ npm run seed
```

### Usage

Run the following script to use the application:

```
$ npm run start
```

## License

MIT License

## GIF

![Command line and Postman run-through animation]()

## Demo Video

Click to [view a demo video]()
