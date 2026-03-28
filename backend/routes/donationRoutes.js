const express = require('express');
const router = express.Router();
const { createDonation, getMyDonations, downloadReceipt, getAllDonations, uploadReceipt } = require('../controllers/donationController');
const { protect } = require('../middlewares/authMiddleware');

// Admin routes (accessed via basic frontline password on admin panel)
router.get('/all', getAllDonations); // admin
router.put('/:id/upload-receipt', uploadReceipt); // admin

// Route all other endpoints through the protect middleware so only logged-in users can access them
router.use(protect);

router.post('/', createDonation);
router.get('/my-donations', getMyDonations);
router.get('/:id/receipt', downloadReceipt);

module.exports = router;
