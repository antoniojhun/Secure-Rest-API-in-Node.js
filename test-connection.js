const mongoose = require('mongoose');

// Set strictQuery to suppress deprecation warning
mongoose.set('strictQuery', false);

const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

console.log('Mongoose version:', mongoose.version);
console.log('Attempting to connect to MongoDB...');

mongoose
  .connect('mongodb://localhost:27017/rest-tutorial', options)
  .then(() => {
    console.log('Connection successful!');

    // Create a simple model
    const TestSchema = new mongoose.Schema({
      name: String,
      created: { type: Date, default: Date.now }
    });

    const Test = mongoose.model('Test', TestSchema);

    // Create a test document
    return Test.create({ name: 'Test Document' })
      .then(doc => {
        console.log('Created test document:', doc);
        return Test.findById(doc._id);
      })
      .then(foundDoc => {
        console.log('Found document:', foundDoc);
        return mongoose.connection.close();
      })
      .then(() => {
        console.log('Connection closed successfully');
        process.exit(0);
      });
  })
  .catch(err => {
    console.error('Connection error:', err.message);
    process.exit(1);
  });
