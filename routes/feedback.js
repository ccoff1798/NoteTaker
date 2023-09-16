const fb = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils'); // nothing attached for this
const uuid = require('../helpers/uuid');//  Nothing attached for this

// GET Route for retrieving all the feedback
fb.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))//changed this to db.json
);

// POST Route for submitting feedback
fb.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { email, feedbackType, feedback } = req.body;

  // If all the required properties are present
  if (email && feedbackType && feedback) {
    // Variable for the object we will save
    const newFeedback = {
      email,
      feedbackType,
      feedback,
      feedback_id: uuid(),
    };

    readAndAppend(newFeedback, './db/db.json');//changed this to db.json

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = fb;