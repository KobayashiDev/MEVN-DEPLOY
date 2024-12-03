const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config(); 
const apiRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use environment variables from .env
const mongoURI = process.env.MONGODB_URI; // Get MongoDB connection string from .env
const PORT = process.env.PORT || 5000; // Get port from .env, default is 5000 if not present

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));



app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
