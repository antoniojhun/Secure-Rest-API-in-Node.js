# Node.js (REST API) + MongoDB

This is a user management REST API using Node.js and MongoDB. The project contains Node.js REST API.

- API
  - Node.js, Express, Cypress, JWT, Nodemon

## Demo

<a href="https://user-images.githubusercontent.com/4811274/72666252-23c90400-3a5c-11ea-870c-f66920ae35bd.png" target="_blank">
<img src="https://user-images.githubusercontent.com/4811274/72666252-23c90400-3a5c-11ea-870c-f66920ae35bd.png" width="33%"></img></a><a href="https://user-images.githubusercontent.com/4811274/72666258-29bee500-3a5c-11ea-9394-a502da05f7bd.png" target="_blank">
<img src="https://user-images.githubusercontent.com/4811274/72666258-29bee500-3a5c-11ea-9394-a502da05f7bd.png" width="33%"></img></a><a href="https://user-images.githubusercontent.com/4811274/72666263-32172000-3a5c-11ea-8134-67a531772b5a.png" target="_blank">
<img src="https://user-images.githubusercontent.com/4811274/72666263-32172000-3a5c-11ea-8134-67a531772b5a.png" width="33%"></img></a>

## How to start in your local environment

```bash
$ docker-compose up -d
```

Once docker containers are up, then you can access services with below URL. I Recommend using Insomnia to debug REST API https://insomnia.rest/

| Service | Endpoint                                        |
| ------- | ----------------------------------------------- |
| API     | [http://localhost:3600/](http://localhost:3600) |

### API

API docker container will be launched as development mode with nodemon. However, it won't detect any changes unless uncomment volumes.

To enable live change for the API, simply uncomment following lines in `docker-compose.yml`

```text
  volumes:
    - ./:/usr/src/app
```

## Features

- API
  - ID (auto-generated UUID)
  - First Name
  - Last Name
  - Email
  - Password
  - Permission Level
  - POST endpoint/users
  - GET endpoint/users - need to change Perminssion Level to 7 in MongoDB
  - GET endpoint/users:userID(get specific user)
  - PATCH endpoint/users:userID(update the data for the specific user) - need to change Perminssion Level to 7 in MongoDB
  - DELETE endpoint/users:userID(remove the specified user) - need to change Perminssion Level to 7 in MongoDB

## Todo

- [x] Unit tests and error report
- [x] prevent admins from removing themselves
