const mongoose = require('mongoose');

const connections = {}; // Object to hold connections

const connectGlobalDB = async () => {
  try {
    if (!connections.global || connections.global.readyState !== 1) {
      const dbURI = process.env.GLOBAL_DB_URI;
      const connection = await mongoose.createConnection(dbURI).asPromise();

      console.log('Connected to global database');
      connections.global = connection;
    } else {
      console.log('Using existing connection to global database');
    }

    return connections.global;
  } catch (error) {
    console.error('Error connecting to global database:', error);
    throw new Error('Failed to connect to global database');
  }
};

module.exports = { connectGlobalDB };
