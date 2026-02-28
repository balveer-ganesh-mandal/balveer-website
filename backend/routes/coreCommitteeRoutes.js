const express = require('express');
const router = express.Router();
const coreCommitteeController = require('../controllers/coreCommitteeController');

router.get('/', coreCommitteeController.getCoreCommittee);
router.post('/', coreCommitteeController.updateCoreCommitteeData);
router.delete('/', coreCommitteeController.deleteCoreCommitteeMember);

module.exports = router;
