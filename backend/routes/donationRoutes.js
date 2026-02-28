const express = require('express');
const router = express.Router();
const { createDonation, getMyDonations, downloadReceipt } = require('../controllers/donationController');
const { protect } = require('../middlewares/authMiddleware');

// Route all endpoints through the protect middleware so only logged-in users can access them
router.use(protect);

router.post('/', createDonation);
router.get('/my-donations', getMyDonations);
router.get('/:id/receipt', downloadReceipt);

module.exports = router;
