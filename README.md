### iReporter
[![Build Status](https://travis-ci.org/chekwas88/iReporter.svg?branch=develop)](https://travis-ci.org/chekwas88/iReporter)
[![Maintainability](https://api.codeclimate.com/v1/badges/d666223bb5aa1c7fe65b/maintainability)](https://codeclimate.com/github/chekwas88/iReporter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d666223bb5aa1c7fe65b/test_coverage)](https://codeclimate.com/github/chekwas88/iReporter/test_coverage)

iReporter web app is an app that enables citizens of a country to report corruption and intervention cases to appropriate authorities.

## Features
- An intending user can register and sign up
- A user can report a red-flag or intervention incident
- A user can view all reports created
- A user can make changes to report
- A user can delete its own report



## Technologies

- Node.js
- Express
- Eslint
- Mocha
- chai
- Babel
- Joi

## API 
|Endpoints                                 |  Functions                                              |
|------------------------------------------|---------------------------------------------------------|
| POST  /api/v1/users                      | register user                                           |
| GET   /api/v1/users/:id                  | login user                                              |
| GET   /api/v1/red-flags                  | returns all red-flag or intervention reports            |
| GET   /api/v1/red-flags/:id              | returns the requested red-flag or intervention report.  |
| POST  /api/v1/red-flags                  | create a report                                         |
| PATCH /api/v1/red-flags/:id/location     | update a report's location                              |
| PATCH /api/v1/red-flags/:id/comment      | update a report's comment                               |
| PATCH /api/v1/red-flags/:id              | update a report
