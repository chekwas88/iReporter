### iReporter
[![Build Status](https://travis-ci.org/chekwas88/iReporter.svg?branch=develop)](https://travis-ci.org/chekwas88/iReporter)
[![Maintainability](https://api.codeclimate.com/v1/badges/d666223bb5aa1c7fe65b/maintainability)](https://codeclimate.com/github/chekwas88/iReporter/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/chekwas88/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/chekwas88/iReporter?branch=develop)
iReporter web app is an app that enables citizens of a country to report corruption and intervention cases to appropriate authorities.

## Features
- An intending user can register and sign up
- A user can report a red-flag or intervention incident
- A user can view all reports created
- A user can make changes to report
- A user can delete its own report



## Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com)
- [Eslint](https://eslint.org)
- [Mocha](https://mochajs.org)
- [Chai](http://chaijs.com)
- [Babel](https://babeljs.io)
- [Joi](https://github.com/hapijs/joi)

## API 
|Endpoints                                 |  Functions                                                                          |
|------------------------------------------|-------------------------------------------------------------------------------------|
| POST  /users/register                    | register user.                                                                      |
| POST  /auth/users/login                  | login user.                                                                         |
| POST  /api/v1/incidents                  | creates a report.                                                                   |
| GET   /api/v1/incidents                  | return all red-flag or intervention reports. Only Admin can perform this action.    |        
| GET   /api/v1/incidents/:id              | returns the requested red-flag or intervention report.                              |
| GET /api/v1/user/profile/incidents       | return all incident reports created by the user.                                    |
| PATCH /api/v1/incidents/:id/location     | updates a report's location.                                                        |
| PATCH /api/v1/incidents/:id/comment      | updates a report's comment.                                                         |
| PATCH /api/v1/incidents/:id              | updates a report.                                                                   |
| PATCH /api/v1/incidents/:id/status       | updates an incident report's status. Only Admin can perform this action.            | 
| DELETE /api/v1/incidents/:id             | deletes the specified incident reprot.                                              |

## DOCUMENTATION
For the full API documentation visit [Documentation](https://ireporter-chekwas88.herokuapp.com/api-docs)

## Requirement and Installation
This project requires you to have **Node** and  **Git** installed in your system.
To run this project:
clone the repo:

```sh
git clone https://github.com/chekwas88/iReporter.git
```

cd into iReporter

run `npm install` on the command line to install packages.

run `npm start` to start up the project.

## UI Template
The UI template of this project is available at [UI](https://chekwas88.github.io/iReporter/) 

## API
The API for this project is hosted at [iReporter](https://ireporter-chekwas88.herokuapp.com/)
