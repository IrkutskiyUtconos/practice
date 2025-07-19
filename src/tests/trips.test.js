const request = require('supertest');
const app = require('../app');
const { User, Trip } = require('../models');

describe('POST /api/trips', () => {
  let token;

  beforeAll(async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  });

  it('should create a trip', async () => {
    const res = await request(app)
      .post('/api/trips')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Trip',
        startDate: '2023-12-01',
        difficulty: 'easy'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});