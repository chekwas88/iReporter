import {
  describe,
  it,
  before,
} from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';
import table from '../db/dropTables';


use(chaihttp);

let token;
describe('F) Delete incident', () => {
  // after((done) => {
  //   table.dropIncidentsTable();
  //   done();
  // });
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
      .delete('/api/v1/incidents/1')
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
      .delete('/api/v1/incidents/1')
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
  it('it should return an error when invalid incident id is requested', (done) => {
    request(app)
      .delete('/api/v1/incidents/jjkm')
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
  it('it should delete a given record', (done) => {
    request(app)
      .delete('/api/v1/incidents/1')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.message,
          'Report has been deleted successfully',
        );
        done(err);
      });
  });
  table.dropIncidentsTable();
});
