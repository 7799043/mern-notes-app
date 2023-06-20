const request = require('supertest');
const app = require('../../server');
const userCtrl = require('../../controllers/userCtrl');
const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('GET /verifiedToken', () => {
  it('should return true if token is valid', async () => {
    const user = {
      _id: 'testUserId',
      username: 'testuser',
    };

    // Generowanie ważnego tokenu JWT
    const token = jwt.sign({ id: user._id, name: user.username }, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });

    const response = await request(app)
      .get('/verifiedToken')
      .set('Authorization', token);

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('true');
  });

  it('should return false if token is missing', async () => {
    const response = await request(app).get('/verifiedToken');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('false');
  });

  it('should return false if token is invalid', async () => {
    const invalidToken = 'invalidtoken';

    const response = await request(app)
      .get('/verifiedToken')
      .set('Authorization', invalidToken);

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('false');
  });

  it('should return false if user does not exist', async () => {
    const userToken = jwt.sign({ id: 'nonexistentUserId', name: 'nonexistentuser' }, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });

    const response = await request(app)
      .get('/verifiedToken')
      .set('Authorization', userToken);

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('false');
  });
});
