const express = require('express');
const router = express.Router();
const { getInventory, addOrUpdateInventory, deleteInventory, bookEquipment, returnEquipment, getBookings } = require('../controllers/inventoryController');

// Define API routes
router.get('/', getInventory);
// Simplified: no multer upload required anymore
router.post('/', addOrUpdateInventory); 
router.delete('/:id', deleteInventory);

// Booking Endpoints
router.get('/bookings', getBookings);
router.post('/book', bookEquipment);
router.post('/return/:bookingId', returnEquipment);

module.exports = router;
