import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);

let token;

describe('E) PATCH incidents', () => {
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
      .patch('/api/v1/incidents/1')
      .set('authorization', 'Bearer kkjdduu88999jxxxxxxxxxxxxnns66s')
      .send({
        comment: 'Bribery at ijk bank',
        location: 'Rumuola, PortHarcourt',
        title: 'Bribery and corruption',
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
  it('it should return an error if no authorization token is provided', (done) => {
    request(app)
      .patch('/api/v1/incidents/1')
      .set('authorization', '')
      .send({
        comment: 'Bribery at ijk bank',
        location: 'Rumuola, PortHarcourt',
        title: 'Bribery and corruption',
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
  it('it should update given records\'s location', (done) => {
    request(app)
      .patch('/api/v1/incidents/1/location')
      .set('authorization', `Bearer ${token}`)
      .send({
        location: 'Rumuola, PortHarcourt',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.message,
          'Location has been updated successfully',
        );
        assert.isObject(res.body.data, 'This should be an array of objects');
        assert.exists(res.body.data.location);
        done(err);
      });
  });
  it('it should return an error when invalid incident id is requested', (done) => {
    request(app)
      .patch('/api/v1/incidents/jjkm/location')
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
  it('it should return an error if location is not provided', (done) => {
    request(app)
      .patch('/api/v1/incidents/1/location')
      .set('authorization', `Bearer ${token}`)
      .send({
        location: '',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"location" is not allowed to be empty',
        );
        done(err);
      });
  });
  it('it should update given records\'s comment', (done) => {
    request(app)
      .patch('/api/v1/incidents/1/comment')
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: 'Gross misconduct at xyz bank',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.message,
          'Comment has been updated successfully',
        );
        assert.isObject(res.body.data, 'This should be an array of objects');
        assert.exists(res.body.data.comment);
        done(err);
      });
  });
  it('it should return an error when invalid incident id is requested', (done) => {
    request(app)
      .patch('/api/v1/incidents/jjkm/comment')
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
  it('it should return an error if comment is not provided', (done) => {
    request(app)
      .patch('/api/v1/incidents/1/comment')
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: '',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"comment" is not allowed to be empty',
        );
        done(err);
      });
  });
  it('it should return an error when invalid incident id is requested', (done) => {
    request(app)
      .patch('/api/v1/incidents/jjkm')
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
  it('it should update a given record', (done) => {
    request(app)
      .patch('/api/v1/incidents/1')
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: 'Bribery at ijk bank',
        location: 'Asaba Delta',
        title: 'Bribery and corruption',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.message,
          'Record has been updated successfully',
        );
        assert.isObject(res.body.data, 'This should be an array of object');
        assert.exists(res.body.data.location);
        assert.exists(res.body.data.comment);
        done(err);
      });
  });
  it('it should return an error if comment is not provided', (done) => {
    request(app)
      .patch('/api/v1/incidents/1')
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: '',
        location: 'Asaba Delta',
        title: 'Bribery and corruption',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"comment" is not allowed to be empty',
        );
        done(err);
      });
  });
  it('it should return an error if location is not provided', (done) => {
    request(app)
      .patch('/api/v1/incidents/1')
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: 'Bribery at ijk bank',
        location: '',
        title: 'Bribery and corruption',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(
          res.body.message,
          '"location" is not allowed to be empty',
        );
        done(err);
      });
  });

  it('it should return an error when invalid incident id is requested', (done) => {
    request(app)
      .patch('/api/v1/incidents/jjkm/status')
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

  it('it should update given records\'s status', (done) => {
    request(app)
      .patch('/api/v1/incidents/1/status')
      .set('authorization', `Bearer ${token}`)
      .send({
        status: 'draft',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.message,
          'Status changed successfully',
        );
        assert.isObject(res.body.data, 'This should be an array of objects');
        assert.exists(res.body.data.status);
        done(err);
      });
  });
});
