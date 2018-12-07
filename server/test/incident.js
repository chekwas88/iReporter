import { describe, it } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';
import data from '../model/incident';


use(chaihttp);

describe('/GET all red-flags', () => {
  it('it should return all red-flags', (done) => {
    request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        if (err) done();
        assert.exists(data.incidents, 'incidents does not exist');
        assert.isArray(data.incidents, 'incident is not an array');
        assert.equal(res.status, 200, 'request was not successful');
      });
    done();
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
  it('it should Create a red-flag', (done) => {
    request(app)
      .post('/api/v1/red-flags')
      .send(incident)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(
          res.body.incidents[0].message,
          'red-flag incident was created successfully',
          'error occured while posting incident',
        );
        assert.equal(res.status, 200, 'request was successful');
      });
    done();
  });
});


describe('/Get red-flags/:id', () => {
  it('it should get a red-flag', (done) => {
    request(app)
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
    request(app)
      .patch('/api/v1/red-flags/0/location')
      .send(place)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(
          res.body.incidents[0].message,
          'location has been successfully updated',
          'error occured while patching location',
        );
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});

describe('/PATCH red-flags/:id/comment', () => {
  it('it should get a red-flag comment', (done) => {
    request(app)
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

describe('PATCH /api/v1/red-flags/:id', () => {
  const incident = {
    type: 'redflag',
    title: 'ffd',
    comment: 'p',
    location: 'lag',
  };
  it('it should update an incident', (done) => {
    request(app)
      .patch('/api/v1/red-flags/0')
      .send(incident)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(
          res.body.incidents[0].message,
          'redcord has been successfully updated',
          'error occured, while record is updating',
        );
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});

describe('/Get red-flags/:id', () => {
  it('it should delete a red-flag', (done) => {
    request(app)
      .delete('/api/v1/red-flags/0')
      .end((err, res) => {
        if (err) done(err);
        assert.equal(res.body.incidents[0].message, 'record deleted successfully', 'it should delete a record');
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});
