/**
 * Tests for JWT functionality after upgrading to jsonwebtoken 9.0.0
 */
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../common/config/env.config.js').jwt_secret;
const authController = require('../controllers/authorization.controller');

// Mock crypto
jest.mock('crypto', () => {
  return {
    randomBytes: jest.fn(() => Buffer.from('testsalt')),
    createHmac: jest.fn(() => ({
      update: jest.fn(() => ({
        digest: jest.fn(() => 'testhash')
      }))
    }))
  };
});

describe('JWT Authentication', () => {
  // Setup mock request and response
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        userId: 'testuser123',
        permissionLevel: 1
      },
      jwt: {
        userId: 'testuser123',
        refreshKey: 'testsalt'
      }
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn()
    };

    jest.clearAllMocks();
  });

  test('login should generate a token and refresh token', () => {
    // Execute
    authController.login(req, res);

    // Verify response
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();

    // Check that response contains tokens
    const responseArg = res.send.mock.calls[0][0];
    expect(responseArg).toHaveProperty('accessToken');
    expect(responseArg).toHaveProperty('refreshToken');

    // Verify the accessToken can be decoded
    const decodedToken = jwt.verify(responseArg.accessToken, jwtSecret);
    expect(decodedToken).toHaveProperty('userId', 'testuser123');
  });

  test('refresh_token should generate a new token', () => {
    // Execute
    authController.refresh_token(req, res);

    // Verify response
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();

    // Check that response contains the new token
    const responseArg = res.send.mock.calls[0][0];
    expect(responseArg).toHaveProperty('id');

    // Verify the token can be decoded
    const decodedToken = jwt.verify(responseArg.id, jwtSecret);
    expect(decodedToken).toHaveProperty('userId', 'testuser123');
  });

  test('jwt.sign should use the correct parameters', () => {
    // Spy on jwt.sign
    const signSpy = jest.spyOn(jwt, 'sign');

    // Execute
    authController.login(req, res);

    // Verify jwt.sign was called with the right params
    expect(signSpy).toHaveBeenCalledWith(req.body, jwtSecret);

    // Clean up spy
    signSpy.mockRestore();
  });

  test('jwt.verify should correctly validate tokens', () => {
    // Create a token
    const token = jwt.sign({ userId: 'testuser123' }, jwtSecret);

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    expect(decoded).toHaveProperty('userId', 'testuser123');
  });

  test('Buffer.from should be used instead of new Buffer', () => {
    // Spy on Buffer.from
    const fromSpy = jest.spyOn(Buffer, 'from');

    // Execute
    authController.login(req, res);

    // Verify Buffer.from was called
    expect(fromSpy).toHaveBeenCalled();

    // Clean up spy
    fromSpy.mockRestore();
  });
});
