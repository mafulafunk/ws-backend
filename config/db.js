const mongoose = require('mongoose');
var config = require('./config.js');

const db = mongoose.connection;

db.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});

db.on('connected', function() {
  console.log('MongoDB connected!');
});

db.on('disconnected', function() {
  console.log('MongoDB disconnected!');
  setTimeout(function() {
    mongoose.connect(config.dbURI, {
      server: { auto_reconnect: true }
    });
  }, 1000);
});

const connectDB = async () => {
  try {
    mongoose.connect(config.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
