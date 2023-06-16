// const request = require('supertest');
// const app = require('../server');
// const userCtrl = require('../controllers/userCtrl');
// const Users = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

//   describe('POST /users/login', () => {
//     beforeAll(async () => {
//       await Users.deleteMany({});
//       const passwordHash = await bcrypt.hash('testpassword', 10);
//       const user = new Users({
//         username: 'testuser',
//         email: 'test@example.com',
//         password: passwordHash
//       });
//       await user.save();
//     });

//     it('should return 200 and a token if login is successful', async () => {
//       const credentials = {
//         email: 'test@example.com',
//         password: 'testpassword'
//       };

//       const response = await request(app)
//         .post('/users/login')
//         .send(credentials);

//       expect(response.statusCode).toBe(200);
//       expect(response.body.token).toBeDefined();
//     });

//     it('should return 400 if user does not exist', async () => {
//       const invalidCredentials = {
//         email: 'nonexistent@example.com',
//         password: 'testpassword'
//       };

//       const response = await request(app)
//         .post('/users/login')
//         .send(invalidCredentials);

//       expect(response.statusCode).toBe(400);
//       expect(response.body.msg).toBe('User does not exist.');
//     });

//     it('should return 400 if password is incorrect', async () => {
//       const incorrectPassword = {
//         email: 'test@example.com',
//         password: 'incorrectpassword'
//       };

//       const response = await request(app)
//         .post('/users/login')
//         .send(incorrectPassword);

//       expect(response.statusCode).toBe(400);
//       expect(response.body.msg).toBe('Incorrect password.');
//     });

//     it('should return 500 if an error occurs during login', async () => {
//       const invalidData = {
        
//       };

//       const response = await request(app)
//         .post('/users/login')
//         .send(invalidData);

//       expect(response.statusCode).toBe(500);
//       expect(response.body.msg).toBeDefined();
//     });
//   });
