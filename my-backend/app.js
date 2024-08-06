const express = require('express');
const cors = require('cors');
const app = express();
const ClientController = require('./controllers/CustomerControllerr');

app.use(cors());
app.use(express.json());
app.use('/', ClientController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));