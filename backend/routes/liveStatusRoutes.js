const express = require('express');
const router = express.Router();
const liveStatusController = require('../controllers/liveStatusController');

router.get('/', liveStatusController.getLiveStatus);
router.post('/', liveStatusController.updateLiveStatus);

module.exports = router;
