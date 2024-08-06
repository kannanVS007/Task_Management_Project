const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../routes');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

mongoose.connect('mongodb://localhost/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));