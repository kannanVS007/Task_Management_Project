const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
// app.use(cors());
app.use(bodyParser.json());

// Mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const clientRoutes = require('./routes/customer');
app.use('/api/clients', clientRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
