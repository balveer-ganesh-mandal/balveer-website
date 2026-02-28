const express = require('express');
const router = express.Router();
const subCommitteeController = require('../controllers/subCommitteeController');

router.get('/', subCommitteeController.getSubCommittees);
router.post('/', subCommitteeController.addSubCommitteeOrMember);
router.delete('/', subCommitteeController.deleteSubCommitteeMember);

module.exports = router;
