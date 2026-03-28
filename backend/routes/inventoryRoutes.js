const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { getInventory, addOrUpdateInventory, deleteInventory } = require('../controllers/inventoryController');

// Define API routes
router.get('/', getInventory);
router.post('/', upload.single('image'), addOrUpdateInventory);
router.delete('/:id', deleteInventory);

module.exports = router;
