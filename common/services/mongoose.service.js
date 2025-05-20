const mongoose = require('mongoose');
let count = 0;

// Set strictQuery to suppress deprecation warning
mongoose.set('strictQuery', false);

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Server selection timeout
  socketTimeoutMS: 45000, // Socket timeout
  family: 4 // Use IPv4, skip trying IPv6
};

// Support both local development and Docker environments
const mongoUrl = process.env.MONGODB_URI || 'mongodb://mongo:27017/rest-tutorial';

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose
    .connect(mongoUrl, options)
    .then(() => {
      console.log('MongoDB is connected to', mongoUrl);
    })
    .catch(err => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
      console.log('Error details:', err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

exports.mongoose = mongoose;
