const mongoose = require('mongoose');

// Set strictQuery to suppress deprecation warning
mongoose.set('strictQuery', false);

// Create user schema and model directly in this test file
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.model('Users', userSchema);

// User model methods
const findByEmail = email => {
  return User.find({ email: email });
};

const findById = id => {
  return User.findById(id).then(result => {
    if (!result) return null;
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

const createUser = userData => {
  const user = new User(userData);
  return user.save();
};

const patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then(user => {
        if (!user) {
          reject('User not found');
          return;
        }

        for (let i in userData) {
          user[i] = userData[i];
        }

        return user.save();
      })
      .then(updatedUser => {
        resolve(updatedUser);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const removeById = userId => {
  return User.deleteOne({ _id: userId });
};

// Test functions
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

    const user = await createUser(testUser);
    console.log('User created successfully:', user.id);
    return user.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function testFindById(userId) {
  try {
    console.log('Testing find user by ID...');
    const user = await findById(userId);
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

async function testUpdateUser(userId) {
  try {
    console.log('Testing user update...');
    const updateData = {
      firstName: 'Updated',
      lastName: 'User'
    };
    const user = await patchUser(userId, updateData);
    console.log('User updated successfully:', user);
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function testDeleteUser(userId) {
  try {
    console.log('Testing user deletion...');
    const result = await removeById(userId);
    console.log('User deletion result:', result);

    // Verify deletion
    const user = await findById(userId);
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

    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/rest-tutorial', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log('Connected to MongoDB');

    // Run tests
    const userId = await testCreateUser();
    await testFindById(userId);
    await testUpdateUser(userId);
    await testDeleteUser(userId);

    console.log('All tests completed successfully!');

    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

// Run tests
runTests();
