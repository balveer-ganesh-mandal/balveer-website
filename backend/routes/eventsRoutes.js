const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const upload = require('../middlewares/upload');

router.get('/', eventsController.getEvents);
router.post('/', upload.single('poster'), eventsController.addOrUpdateEvent);
router.delete('/', eventsController.deleteEvent);

module.exports = router;
