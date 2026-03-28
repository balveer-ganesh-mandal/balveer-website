const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    itemType: {
        type: String,
        required: true,
        trim: true // e.g., 'wheelchair', 'walker'
    },
    titleEn: {
        type: String,
        required: true
    },
    titleMr: {
        type: String,
        required: true
    },
    totalUnits: {
        type: Number,
        required: true,
        default: 0
    },
    availableUnits: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
