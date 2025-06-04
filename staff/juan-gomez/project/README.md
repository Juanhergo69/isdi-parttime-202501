# Project Name
Retro Gaming World

![Aqui mi imagen](./frontend/public/images/Rgw.jpg)

## Introduction

Retro Gaming World is a website designed by and for nostalgic fans. Great hits from the past come together to remind us that what we consider spectacular today had simple origins. No complex gameplay mechanics, just fun.
This is the essence of video games: to make us enjoy ourselves, and with this idea, we seek to reach an audience that already lived through this wonderful era, attracting young people and introducing them to the great classics.
Enjoy it alone, with friends, or however you prefer! Retro Gaming World opens its doors to you!

## Functional Description

The website will allow you to register, play the variety of games available, rate them, comment on them, and record your scores. You can even mark the games you like the most as favorites! Remember, you can also customize your profile, for example, by adding an avatar of your choice. And if you get tired of your username, email, or password, don't worry! You can also change them.

### Use Cases

- Create an account
- Log in
- Edit your account
- Delete your account
- View playable games
- Play games
- View game options (favorites, likes, dislikes, high scores, comments)
- View your profile page
- Edit your profile
- View your favorite games page
- Delete messages
- Delete your account

## UI/UX Design

[Aqui mi link](https://www.figma.com/design/fToTgRo8hcjUxl2uNbJs0u/Retro-Gaming-World?node-id=0-1&t=hKUJGRAyuKRCMGuu-1) 

## Technical Description
//Nada (de momento)//
### Technologies & Libraries

- React
- Vite
- Tailwind
- react-router
- Express
- Node
- Mongo+Mongoose
- Mocha Chai
- Bcrypt / Token Library (jose, jwt, etc)

### Data Models

user{
  username: 'string'
  email: 'string'
  password: 'string'
  id: objectId
  avatar: 'string'
  favorite: [gameId]
}

game{
  id: objectid,
  name: string
  description: string
  cover: string
  highScore: {
    score: number,
    user: userId
  }
  like: userId
  dislike: userId,
  comments: {
    author: userId,
    comment: string,
    date: published
  }
}

_Data models describe how the database saves documents._

[Learn more about data modeling here.](https://www.mongodb.com/resources/basics/databases/data-modeling)

***(e.g.)* User Model**
- *(e.g.)* id (ObjectId)
- *(e.g.)* username (string)
- *(e.g.)* password (string)
- *(e.g.)* avatar (string)

_Additional data models as needed._

### Test Coverage

</br>

_Include a table or screenshot of your backend test coverage here._

## Project

If you have deployed your app, add the link here!

