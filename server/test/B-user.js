import { describe, it } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);


describe('A) POST registration /users/register', () => {
  const user = {
    firstname: 'Mark',
    lastname: 'Oluwadara',
    password: 'alternate',
    othername: 'Diablo',
    phoneNumber: '0777726617',
    username: 'Markitic',
    email: 'mark@mail.com',
  };
  it('it should register a user', (done) => {
    request(app)
      .post('/users/register')
      .send(user)
      .end((err, res) => {
        assert.isObject(res.body, 'Should return an object');
        assert.equal(
          res.body.data[0].message,
          'user has been registered successfully',
          'error occured, user registration is unsuccessful',
        );
        assert.equal(res.status, 201, 'request was unsuccessful');
        done(err);
      });
  });

  it('it should return an error if there is no email provided', (done) => {
    request(app)
      .post('/users/register')
      .send({
        firstname: 'Pablo',
        lastname: 'Chux',
        othername: 'Dike',
        password: 'password',
        phoneNumber: '081237743299999',
        username: 'Pman',
        email: '',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"email" is not allowed to be empty',
          'error occured, no email provided',
        );
        done(err);
      });
  });
  it('it should return an error if there is no firstname provided', (done) => {
    request(app)
      .post('/users/register')
      .send({
        firstname: '',
        lastname: 'Chux',
        othername: 'Dike',
        password: 'password',
        phoneNumber: '081237743299999',
        username: 'Pman',
        email: 'pablo@mail.com',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"firstname" is not allowed to be empty',
          'error occured, no firstname provided',
        );
        done(err);
      });
  });

  it('it should return an error if there is no lastname provided', (done) => {
    request(app)
      .post('/users/register')
      .send({
        firstname: 'Pablo',
        lastname: '',
        othername: 'Dike',
        password: 'password',
        phoneNumber: '081237743299999',
        username: 'Pman',
        email: 'pablo@mail.com',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"lastname" is not allowed to be empty',
          'error occured, no lasttname provided',
        );
        done(err);
      });
  });

  it('it should return an error if there is no password provided', (done) => {
    request(app)
      .post('/users/register')
      .send({
        firstname: 'Pablo',
        lastname: 'Chux',
        othername: 'Dike',
        password: '',
        phoneNumber: '081237743299999',
        username: 'Pman',
        email: 'pablo@mail.com',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"password" is not allowed to be empty',
          'error occured, no password provided',
        );
        done(err);
      });
  });

  it('it should return an error if there is no phoneNumber provided', (done) => {
    request(app)
      .post('/users/register')
      .send({
        firstname: 'Pablo',
        lastname: 'Chux',
        othername: 'Dike',
        password: 'password',
        phoneNumber: '',
        username: 'Pman',
        email: 'pablo@mail.com',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"phoneNumber" is not allowed to be empty',
          'error occured, no phoneNumber provided',
        );
        done(err);
      });
  });

  it('it should return an error if there is no username provided', (done) => {
    request(app)
      .post('/users/register')
      .send({
        firstname: 'Pablo',
        lastname: 'Chux',
        othername: 'Dike',
        password: 'password',
        phoneNumber: '081237743299999',
        username: '',
        email: 'pablo@mail.com',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"username" is not allowed to be empty',
          'error occured, no username provided',
        );
        done(err);
      });
  });
});

describe('B) POST login /auth/users/login', () => {
  it('it should login a user', (done) => {
    request(app)
      .post('/auth/users/login')
      .send({
        email: 'mark@mail.com',
        password: 'alternate',
      })
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'login was successful');
        assert.isArray(res.body.data, 'it should be an object');
        assert.isNotEmpty(res.body.data, 'it should not be empty');
        assert.equal(res.status, 201, 'request was unsuccessful');
        done(err);
      });
  });

  it('it should return an error if there is no email provided', (done) => {
    request(app)
      .post('/auth/users/login')
      .send({
        email: '',
        password: 'alternate',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"email" is not allowed to be empty',
          'error occured, email is not provided',
        );
        done(err);
      });
  });

  it('it should return an error if there is no password provided', (done) => {
    request(app)
      .post('/auth/users/login')
      .send({
        email: 'mark@mail.com',
        password: '',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"password" is not allowed to be empty',
          'error occured, password is not provided',
        );
        done(err);
      });
  });

  it('it should return an error if the wrong email is provided', (done) => {
    request(app)
      .post('/auth/users/login')
      .send({
        email: 'marksddf@mail.com',
        password: 'alternate',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(
          res.body.message,
          'Email or password is incorrect',
        );
        done(err);
      });
  });

  it('it should return an error if the wrong password is provided', (done) => {
    request(app)
      .post('/auth/users/login')
      .send({
        email: 'mark@mail.com',
        password: 'allterbb',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(
          res.body.message,
          'Email or password is incorrect',
        );
        done(err);
      });
  });
});
