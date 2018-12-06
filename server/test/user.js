import { describe, it } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);


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
    request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(
          res.body.users[0].message,
          'user has been registered successfully',
          'error occured, user registration is unsuccessful',
        );
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});

describe('/Get user/:id', () => {
  it('it should get a red-flag', (done) => {
    request(app)
      .get('/api/v1/users/0')
      .end((err, res) => {
        if (err) done(err);
        assert.exists(res.body.users[0].firstname, 'an error occured, firstname does not exist');
        assert.exists(res.body.users[0].email, 'an error occured, email does not exist');
        assert.equal(res.status, 200, 'request was unsuccessful');
      });
    done();
  });
});
