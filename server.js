
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBConnect = require('./database/DBConnect');
const router = require('./src/v1/router');
const mongoose = require('mongoose');

// loading the env variables
dotenv.config({ path: './config/config.env' });


// getting the port from the environment variables
const PORT = process.env.PORT;

// initializing the express app
const app = express();

// setting up the cors
app.use(cors());

// Enable JSON body parsing
app.use(express.json());
app.use(express.json({ limit: '10mb' }));

// our server listening
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });

// connecting to the database
DBConnect();



// api welcome check
app.get('/', async (req, res) => {
    try {
      res.status(200).send({
        message: 'Welcome to Kyc API',
      });
    } catch (err) {
      res.status(404).send(err);
    }
  });

// adding the routing file
// app.use('/v1', router);