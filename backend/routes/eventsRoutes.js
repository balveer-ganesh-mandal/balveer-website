const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/', eventsController.getEvents);
router.post('/', eventsController.addOrUpdateEvent);
router.delete('/', eventsController.deleteEvent);

module.exports = router;
