const { connect } = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const mongoOpt = {
  dbName: 'assignmentDatabase'
};

const DBConnect = async () => {
  try {
    await connect(process.env.MONGO_URI, mongoOpt);
    console.log('Connected to MongoDB Server');
  } catch (error) {
    console.log(error);
    return error.message
  }
};

module.exports = DBConnect;