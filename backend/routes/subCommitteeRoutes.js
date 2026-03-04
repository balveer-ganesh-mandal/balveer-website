const express = require('express');
const router = express.Router();
const subCommitteeController = require('../controllers/subCommitteeController');

router.get('/', subCommitteeController.getSubCommittees);
router.post('/', subCommitteeController.addSubCommitteeOrMember);
router.put('/', subCommitteeController.editSubCommitteeMember);
router.delete('/', subCommitteeController.deleteSubCommitteeMember);

module.exports = router;
