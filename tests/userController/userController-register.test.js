const request = require('supertest');
const app = require('../../server');
const userCtrl = require('../../controllers/userCtrl');
const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


  describe('POST /users/register', () => {
    beforeAll(async () => {
      await Users.deleteMany({});
    });

    it('should return success message if registration is successful', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      };

      const response = await request(app)
        .post('/users/register')
        .send(newUser);

      expect(response.statusCode).toBe(200);
      expect(response.body.msg).toBe('Sign up Success');
    });

    it('should return error if email already exists', async () => {
      const existingUser = {
        username: 'existinguser',
        email: 'test@example.com', // Email already exists in the database
        password: 'testpassword',
      };

      const response = await request(app)
        .post('/users/register')
        .send(existingUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe('The email already exists.');
    });

    it('should return error if an error occurs during registration', async () => {
      const invalidUser = {
        // Invalid user object without required fields
      };


      const response = await request(app)
        .post('/users/register')
        .send(invalidUser);

      expect(response.statusCode).toBe(500);
      expect(response.body.msg).toBeDefined();
    });
  });


 