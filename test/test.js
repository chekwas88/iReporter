const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { assert } = chai;

chai.use(chaiHttp);


describe('/GET red-flags', () => {
  it('it should GET all the red-flags', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        assert.equal(res.status, 200, 'request was unsuccessful');
        done();
      });
  });
  it('it should return an array of redflags', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        assert.isArray(res.body.incidents, 'incidents is not of type array');
        done();
      });
  });
});

describe('/POST red-flags', () => {
  it('it should create a red-flag', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .end((err, res) => {
        assert.equal(res.status, 200, 'request was unsuccessful');
        done();
      });
  });

  it('it should return an object of created red-flag', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .end((err, res) => {
        assert.isObject(res.body, 'incidents is not of type object');
        done();
      });
  });
});
