/**
 * Test file for users.model.js
 */

// Mock the users.model module directly
jest.mock('../models/users.model');

// Import the mocked model
const userModel = require('../models/users.model');

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('findByEmail returns user data', async () => {
    // Setup
    const email = 'test@example.com';
    const mockUsers = [{ email }];
    userModel.findByEmail.mockResolvedValueOnce(mockUsers);

    // Execute
    const result = await userModel.findByEmail(email);

    // Verify
    expect(userModel.findByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual(mockUsers);
  });

  test('createUser should save user data', async () => {
    // Setup
    const mockUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password',
      permissionLevel: 1
    };

    const savedUser = {
      ...mockUser,
      id: '123'
    };

    userModel.createUser.mockResolvedValueOnce(savedUser);

    // Execute
    const result = await userModel.createUser(mockUser);

    // Verify
    expect(userModel.createUser).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(savedUser);
  });

  test('patchUser should throw an Error when user is not found', async () => {
    // Setup
    const userId = 'nonexistent-id';
    const updateData = { firstName: 'Updated' };
    const errorMessage = 'User not found';

    userModel.patchUser.mockRejectedValueOnce(new Error(errorMessage));

    // Execute & Verify
    await expect(userModel.patchUser(userId, updateData)).rejects.toThrow(errorMessage);

    expect(userModel.patchUser).toHaveBeenCalledWith(userId, updateData);
  });

  test('removeById should delete a user', async () => {
    // Setup
    const userId = '123';
    const deleteResult = { acknowledged: true, deletedCount: 1 };
    userModel.removeById.mockResolvedValueOnce(deleteResult);

    // Execute
    const result = await userModel.removeById(userId);

    // Verify
    expect(userModel.removeById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(deleteResult);
  });
});
