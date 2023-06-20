const request = require('supertest');
const app = require('../../server');



describe('API Endpoint - verifiedToken', () => {
  it('should return true if token is valid', async () => {
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'testpassword' });
  
    const validToken = loginResponse.body.token;
  
    const response = await request(app)
      .get('/users/verify')
      .set('Authorization', validToken);
  
    expect(response.status).toBe(200);
    expect(response.body).toBe(true);
  });
  it('should return false if token is invalid', async () => {
    const invalidToken = 'invalidToken'; 

    const response = await request(app)
      .get('/users/verify')
      .set('Authorization', invalidToken);

    expect(response.status).toBe(200);
    expect(response.body).toBe(false);
  });

  it('should return false if no token is provided', async () => {
    const response = await request(app)
      .get('/users/verify');

    expect(response.status).toBe(200);
    expect(response.body).toBe(false);
  });
});
