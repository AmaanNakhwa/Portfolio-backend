// contactRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sendContactNotificationEmail = require('../utils/emailUtils');
const { body, validationResult } = require('express-validator');

// POST route to create a new contact
router.post('/',
  // Define validations
  [
    body('name').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().escape(),
  ],
  async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, message } = req.body;

      let newUser = new User({ name, email, message });
      await newUser.save();
      await sendContactNotificationEmail(newUser);

      res.status(201).json({ message: 'Contact saved', data: newUser });
    } catch (error) {
      next(error);
    }
  }
);

// GET route to retrieve all contacts
router.get('/', async (req, res, next) => {
  const authToken = req.headers['x-admin-auth-token'];
  // Verify the token
  if (authToken !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const contacts = await User.find(); 
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;