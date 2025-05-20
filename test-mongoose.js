const mongoose = require('./common/services/mongoose.service').mongoose;
const UserModel = require('./users/models/users.model');

// Function to test user creation
async function testCreateUser() {
  try {
    console.log('Testing user creation...');
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      permissionLevel: 1
    };

    const user = await UserModel.createUser(testUser);
    console.log('User created successfully:', user.id);
    return user.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Function to test finding user by ID
async function testFindById(userId) {
  try {
    console.log('Testing find user by ID...');
    const user = await UserModel.findById(userId);
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

// Function to test updating user
async function testUpdateUser(userId) {
  try {
    console.log('Testing user update...');
    const updateData = {
      firstName: 'Updated',
      lastName: 'User'
    };
    const user = await UserModel.patchUser(userId, updateData);
    console.log('User updated successfully:', user);
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Function to test deleting user
async function testDeleteUser(userId) {
  try {
    console.log('Testing user deletion...');
    await UserModel.removeById(userId);
    console.log('User deleted successfully');

    // Verify deletion
    const user = await UserModel.findById(userId);
    console.log('User after deletion (should be null):', user);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Main test function
async function runTests() {
  try {
    console.log('Starting Mongoose tests with version:', mongoose.version);

    // Wait for MongoDB connection to be established
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Run tests
    const userId = await testCreateUser();
    await testFindById(userId);
    await testUpdateUser(userId);
    await testDeleteUser(userId);

    console.log('All tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

// Run tests
runTests();
