const { validateQuote } = require('../utils/joiQuoteValidator');
const { quoteSchema } = require('../utils/joiSchema');

describe('validateQuote middleware', () => {
  const mockReq = (body) => ({ body });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const next = jest.fn();

  it('should call next if validation passes', () => {
    const req = mockReq({
      text: 'A great quote!',
      category: 'Motivation',
      year: 2023,
    });
    const res = mockRes();

    validateQuote(quoteSchema)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 400 if validation fails', () => {
    const req = mockReq({
      text: 'Q',
      category: 'M',
      year: 2023,
    });
    const res = mockRes();

    validateQuote(quoteSchema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.any(String),
    });
    expect(next).not.toHaveBeenCalled();
  });
});
