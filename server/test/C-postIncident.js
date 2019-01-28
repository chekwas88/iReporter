import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);

let token;

describe('C) POST incidents', () => {
  before((done) => {
    request(app)
      .post('/auth/users/login')
      .send({ email: 'mark@mail.com', password: 'alternate' })
      .end((err, res) => {
        // eslint-disable-next-line prefer-destructuring
        token = res.body.data[0].token;
        done(err);
      });
  });
  it('it should post an incident record', (done) => {
    request(app)
      .post('/api/v1/incidents')
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'Money Laundering',
        comment: 'Money Laundering in ABC bank',
        location: 'Surulere Lagos',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.equal(res.body.message, 'Record created successfully');
        assert.exists(res.body.data);
        assert.isObject(res.body.data);
        assert.isNotEmpty(res.body.data);
        done(err);
      });
  });
  it('it should return an error if no authorization token is provided', (done) => {
    request(app)
      .post('/api/v1/incidents')
      .set('authorization', '')
      .send({
        title: 'Money Laundering',
        comment: 'Money Laundering in ABC bank',
        location: 'Surulere Lagos',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(
          res.body.message,
          'no authorization provided',
          'error occured, token is not provided',
        );
        done(err);
      });
  });
  it('it should return an error if token cannot be verifed', (done) => {
    request(app)
      .post('/api/v1/incidents')
      .set('authorization', 'Bearer kkjdduu88999jxxxxxxxxxxxxnns66s')
      .send({
        title: 'Money Laundering',
        comment: 'Money Laundering in ABC bank',
        location: 'surulere, Lagos',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(
          res.body.message,
          'Error, token not verified',
          'error occured, wrong token',
        );
        done(err);
      });
  });

  it('it should return an error if no comment is provided', (done) => {
    request(app)
      .post('/api/v1/incidents')
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'Money Laundering',
        comment: '',
        location: 'Surulere Lagos',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"comment" is not allowed to be empty',
          'error occured, comment is not provided',
        );
        done(err);
      });
  });

  it('it should return an error if no location is provided', (done) => {
    request(app)
      .post('/api/v1/incidents')
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'Money Laundering',
        comment: 'Money Laundering in ABC bank',
        location: '',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"location" is not allowed to be empty',
          'error occured, location is not provided',
        );
        done(err);
      });
  });
});
