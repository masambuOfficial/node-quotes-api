const request = require('supertest');
const app = require('../index'); // Adjust to your app's entry file

describe('Quotes API', () => {
  it('should get all quotes', async () => {
    const res = await request(app).get('/quotes');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('length');
  });

  it('should return 404 if quote not found', async () => {
    const res = await request(app).get('/quotes/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Quote not found');
  });

  it('should create a new quote', async () => {
    const newQuote = {
      text: 'This is a test quote',
      year: 2023,
      category: 'Test',
      name: 'Test Author',
      picture: 'https://example.com/test.jpg'
    };

    const res = await request(app)
      .post('/quotes')
      .send(newQuote);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('text', newQuote.text);
  });

  it('should update an existing quote', async () => {
    const updateData = {
      text: 'Updated quote text',
      year: 2022
    };

    const res = await request(app)
      .put('/quotes/3')
      .send(updateData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('text', updateData.text);
  });

  it('should delete a quote', async () => {
    const res = await request(app).delete('/quotes/3');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Quote deleted successfully');
  });
});
