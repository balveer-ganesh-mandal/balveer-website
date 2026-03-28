const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    itemType: {
        type: String,
        required: true,
        trim: true
    },
    titleEn: {
        type: String,
        required: true
    },
    titleMr: {
        type: String,
        required: true
    },
    descriptionEn: {
        type: String,
        required: true
    },
    descriptionMr: {
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
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
