# Filmdy

## Description

Filmdy is a film diary application built with React, Redux, MongoDB, and Node.js. It lets you find films, add them to a diary, rate them, and provides detailed information sourced from the [OMDb API](http://www.omdbapi.com/) to help users manage and keep track of all of the great (and, of course, not so great) films that they have seen.

## Deployed version

You can find Filmdy hosted [here](https://filmdy-client.herokuapp.com/) on Heroku.

Demo account: demoaccount/demoaccount

## Screenshots

### Landing page

![Landing page](https://i.imgur.com/3LXrko6.jpg)

### Login page

![Login page](https://i.imgur.com/MVW6pTz.png)

### Film diary

![Film diary](https://i.imgur.com/6W26mDV.jpg)

### Search

![Search](https://i.imgur.com/pom5ygO.jpg)

### Film modal

![Film modal](https://i.imgur.com/QrW8qiG.png)

## Tech stack

Filmdy makes use of the latest and greatest technologies in front and backend development, including:

- React for building the frontend
  - React Burger Menu
  - React CSS Grid
  - React DOM
  - React Lazy Hero
  - React Modal
  - React Router
  - React Spinners
- Redux for state management
  - Redux Burger Menu
  - Redux Form
  - Redux Thunk
  - JWT Decode
- Node.js for the backend
- Express.js for backend web framework
  - Bcrypt.js for encryption
  - Passport.js and JWTs for authentication
  - Morgan for logging
- MongoDB
  - Mongoose
- Testing
  - Enzyme for React tests
  - Mocha, Chai, Chai-HTTP, and NYC for backend testing

## Folder structure

```
client/
  README.md
  package.json

  public/
    Static project template
  src/
  config.js - DB/API configuration
  index.js - Root React component
  local-storage.js - Functions for managing localStorage
    __tests__/
      Frontend tests
    actions/
      Redux actions
    components/
    app.js - Primary React component
    no-match.js - 404/error component
      authentication/
        Authentication related components (login, signup, etc)
      diary/
        film-cards/
          Film diary card components
        film-diary/
          Film diary components
      header/
        Header components
        menu/
          Hamburger menu components
      landing/
        Landing page components
      modals/
        Modal components
      search/
        Search components
    reducers/
      Redux reducers
    store/
      Redux store

server/
  README.md
  Procfile - Heroku procfile
  config.js - DB and CORS configuration
  db-mongoose.js - DB connection functions
  index.js - Express.js server
  package.json
  .env - Dotenv environmental variables

  controllers/
    Route controller logic functions
  db/
    Database seeder
  models/
    Mongoose models
  passport/
    JWT and local authentication strategies
  routes/
    Express routing
  test/
    Mocha/Chai testing
```
