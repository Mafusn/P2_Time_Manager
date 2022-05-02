var express = require('express');
var router = express.Router();

// Require our controllers.
var messages_controller = require('../controllers/messagesController'); 

// GET Message page
router.get('/', messages_controller.messages);

module.exports = router;