const request = require('supertest');
const app = require('../server'); 
const userCtrl = require('../controllers/userCtrl'); 
const Users = require('../models/userModel'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('POST /register', () => {
    beforeEach(async () => {
      
      await Users.deleteMany(); 
      const passwordHash = await bcrypt.hash('testpassword', 10);
      await Users.create({
        username: 'testuser',
        email: 'test@example.com',
        password: passwordHash
      });
    });
  
    // it('should return 400 if the email already exists', async () => {
    //   const response = await request(app)
    //     .post('/registerUser')
    //     .send({
    //       username: 'testuser2',
    //       email: 'test@example.com',
    //       password: 'password123'
    //     });
  
    //   expect(response.status).toBe(400);
    //   expect(response.body.msg).toBe('The email already exists.');
    // });
  
    it('should return 200 and success message for a new user', async () => {
      const response = await request(app)
        .post('/buba')
        .send({
          username: 'testuser3',
          email: 'test3@example.com',
          password: 'password123'
        });
  
      expect(response.status).toBe(200);
      expect(response.body.msg).toBe('Sign up Success');
    });
  });