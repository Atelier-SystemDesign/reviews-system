const request = require('supertest');
const express = require('express');
const client = require('../database');
const router = require('../server/router/index');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

const agent = request('localhost:3456');

describe('GET /reviews/metadata', () => {
  it('Should go to the correct endpoint when getting reviews meta data', async () => {
    const response = await agent.get('/api/reviews/meta');
    expect(response.status).toEqual(200);
  });
});

describe('GET /api/reviews', () => {
  it('responds with JSON', async () => {
    const response = await request(app)
      .get('/api/reviews?product_id=1267')
      .set('Accept', 'application/json');
    expect(response.headers['content-type']).toMatch('application/json');
  });
});

describe('POST /api/reviews', () => {
  it('responds with JSON', (done) => {
    request(app)
      .post('/api/reviews')
      .send({ product_id: 9120 })
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
