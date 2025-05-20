/**
 * Mock implementation of users.model.js
 */

// Mock data
const mockUsers = [
  {
    id: '6149cdb47e67b83affaabb31',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    permissionLevel: 1
  },
  {
    id: '6149cdb47e67b83affaabb32',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password456',
    permissionLevel: 2
  }
];

// Mock implementations
const findByEmail = jest.fn(email => {
  return Promise.resolve(mockUsers.filter(user => user.email === email));
});

const findById = jest.fn(id => {
  const user = mockUsers.find(user => user.id === id);
  if (!user) return Promise.resolve(null);

  const result = { ...user };
  delete result._id;
  delete result.__v;
  return Promise.resolve(result);
});

const createUser = jest.fn(userData => {
  const newUser = {
    ...userData,
    id: Math.random()
      .toString(36)
      .substring(2, 15)
  };

  return Promise.resolve({
    ...newUser,
    toJSON: () => newUser
  });
});

const list = jest.fn((perPage, page) => {
  const start = perPage * page;
  const end = start + perPage;
  return Promise.resolve(mockUsers.slice(start, end));
});

const patchUser = jest.fn((id, userData) => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) return Promise.reject(new Error('User not found'));

  const updatedUser = {
    ...mockUsers[userIndex],
    ...userData
  };

  return Promise.resolve(updatedUser);
});

const removeById = jest.fn(userId => {
  return Promise.resolve({ acknowledged: true, deletedCount: 1 });
});

module.exports = {
  findByEmail,
  findById,
  createUser,
  list,
  patchUser,
  removeById
};
