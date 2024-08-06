// my-backend/controllers/Controller.js
const express = require('express');
const router = express.Router();

router.get('/api/time-entries', (req, res) => {
  // This is where you'd typically fetch data from a database
  const timeEntries = [
    { id: 1, description: 'Task 1', duration: 30 },
    { id: 2, description: 'Task 2', duration: 45 },
  ];
  res.json(timeEntries);
});

module.exports = router;