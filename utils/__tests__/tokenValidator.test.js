const jwt = require('jsonwebtoken');
const validateToken = require('../utils/tokenValidator');
const { StatusCodes } = require('http-status-codes');

jest.mock('jsonwebtoken');

describe('validateToken middleware', () => {
  const mockReq = (header) => ({
    headers: { authorization: header }
  });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const next = jest.fn();

  it('should return 400 if auth header is missing', () => {
    const req = mockReq(null);
    const res = mockRes();

    validateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: "Auth header is missing" });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    const req = mockReq('Bearer invalidtoken');
    const res = mockRes();

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    validateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if token is valid', () => {
    const req = mockReq('Bearer validtoken');
    const res = mockRes();

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: 1, role: 'user' });
    });

    validateToken(req, res, next);

    expect(req.user).toEqual({ id: 1, role: 'user' });
    expect(next).toHaveBeenCalled();
  });
});
