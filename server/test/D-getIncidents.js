import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);

let token;

describe('D) GET incidents', () => {
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

  it('it should return an error if token cannot be verifed', (done) => {
    request(app)
      .get('/api/v1/incidents')
      .set('authorization', 'Bearer kkjdduu88999jxxxxxxxxxxxxnns66s')
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
  it('it should return an error if no authorization token is provided', (done) => {
    request(app)
      .get('/api/v1/incidents')
      .set('authorization', '')
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
  it('it should return all incident records', (done) => {
    request(app)
      .get('/api/v1/incidents')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.message,
          'All incidents returned successfully',
        );
        assert.isArray(res.body.data, 'This should be an array of objects');
        done(err);
      });
  });
  it('it should return all user specific incident records', (done) => {
    request(app)
      .get('/api/v1/user/profile/incidents')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.message,
          'All incidents returned successfully',
        );
        assert.isArray(res.body.data, 'This should be an array of objects');
        done(err);
      });
  });
  it('it should return an error when invalid incident id is requested', (done) => {
    request(app)
      .get('/api/v1/incidents/jjkm')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(
          res.body.message,
          'invalid incident id',
        );
        done(err);
      });
  });
  it('it should return user specific incident record', (done) => {
    request(app)
      .get('/api/v1/incidents/1')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.data[0].message,
          'record retrieved successfully',
        );
        assert.isObject(res.body.data[0].record, 'This should be an object');
        done(err);
      });
  });
});
