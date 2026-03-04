const express = require('express');
const router = express.Router();
const coreCommitteeController = require('../controllers/coreCommitteeController');
const upload = require('../middlewares/upload');

router.get('/', coreCommitteeController.getCoreCommittee);
router.post('/', upload.single('memberImg'), coreCommitteeController.updateCoreCommitteeData);
router.delete('/', coreCommitteeController.deleteCoreCommitteeMember);

module.exports = router;
