const cloudinary = require('cloudinary').v2;
const { connect } = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  
  api_key: process.env.API_KEY,        
  api_secret: process.env.API_SECRET,  

});

module.exports = cloudinary;