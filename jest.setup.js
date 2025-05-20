/**
 * Jest setup file
 */

// Prevent connection attempts in mongoose.service.js
jest.mock('./common/services/mongoose.service', () => {
  const mongoose = require('mongoose');

  // Prevent actual connection attempts
  mongoose.connect = jest.fn().mockResolvedValue(true);
  mongoose.set = jest.fn();

  // Mock Schema behavior
  class MockSchema {
    constructor(definition) {
      this.definition = definition;
      this.virtuals = {};
      this.options = {};
    }

    virtual(name) {
      this.virtuals[name] = { get: null };
      return {
        get: fn => {
          this.virtuals[name].get = fn;
          return this;
        }
      };
    }

    set(key, value) {
      this.options[key] = value;
    }
  }

  mongoose.Schema = MockSchema;

  // Mock model operations
  const mockModel = {
    find: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockResolvedValue({}),
    deleteOne: jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 })
  };

  mongoose.model = jest.fn().mockReturnValue(mockModel);

  return {
    mongoose
  };
});

// Prevent console.log from running during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn()
};

// Run before each test
beforeEach(() => {
  jest.clearAllMocks();
});
