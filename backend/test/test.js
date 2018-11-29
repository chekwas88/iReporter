const { describe, it } = require('mocha');
const chai = require('chai');
const chaihttp = require('chai-http');
const request = require('request');
const app = require('../app');

chai.use(chaihttp);
const baseurl = 'http://localhost:4001';

const { assert } = chai;


describe('/GET red-flags', () => {
  it('it should GET all the red-flags', (done) => {
    request.get(`${baseurl}/api/v1/red-flags`, (err, res, body) => {
      const { incidents } = JSON.parse(body);
      assert.isArray(incidents, 'incidents is not of type array');
      assert.equal(res.statusCode, 200, 'request was unsuccessful');
      done();
    });
  });
});

describe('/POST red-flags', () => {
  const incident = {
    createdBy: 7,
    type: 'redflag',
    title: 'ffd',
    comment: 'p',
    location: 'lag',
    createdOn: '9/8/19',
  };
  it('it should GET all the red-flags', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .send(incident)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(res.body.incidents[0].message,
          'red-flag incident was created successfully',
          'error occured while posting incident');
        assert.equal(res.status, 200, 'request was successful');
      });
    done();
  });
});
describe('/Get red-flags/:id', () => {
  it('it should get a red-flag', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/0')
      .end((err, res) => {
        if (err) done(err);
        assert.exists(res.body.incidents[0].location, 'an error occured, location does not exist');
        assert.exists(res.body.incidents[0].comment, 'an error occured, comment does not exist');
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});

describe('/PATCH red-flags/:id/location', () => {
  const place = {
    location: 'Ikeja, Lagos',

  };
  it('it should get a red-flag location', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/0/location')
      .send(place)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(res.body.incidents[0].message,
          'location has been successfully updated',
          'error occured while patching location');
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});

describe('/PATCH red-flags/:id/comment', () => {
  it('it should get a red-flag location', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/0/comment')
      .send({ comment: 'Ikeja, Lagos' })
      .end((err, res) => {
        if (err) done(err);
        assert.equal(res.body.incidents[0].message,
          'comment has been successfully updated',
          'error occured while patching comment');
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});

describe('/GET red-flags/:id', () => {
  it('it should GET all the red-flags', (done) => {
    request.delete(`${baseurl}/api/v1/red-flags/0`, (err, res, body) => {
      const data = JSON.parse(body);
      assert.equal(data.incidents[0].message,
        'record deleted successfully',
        'error occured, incident has not been deleted');
      assert.equal(res.statusCode, 200, 'request was unsuccessful');
      done();
    });
  });
});

describe('POST /api/v1/users', () => {
  const user = {
    firstname: 'klaus',
    lastname: 'Huron',
    othername: 'Diablo',
    phoneNumber: '098726617',
    registered: '98/98/98',
    username: 'AgentCorbinus',
    email: 'email@mail.com',
  };
  it('it should register a user', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(res.body.users[0].message,
          'user has been registered successfully',
          'error occured, user registration is unsuccessful');
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});

describe('PATCH /api/v1/red-flags/0', () => {
  const incident = {
    type: 'redflag',
    title: 'ffd',
    comment: 'p',
    location: 'lag',
    createdOn: '9/8/19',
  };
  it('it should register a user', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(incident)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(res.body.users[0].message,
          'redcord has been successfully updated',
          'error occured, while record is updating');
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});
