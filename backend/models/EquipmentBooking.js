const mongoose = require('mongoose');

const equipmentBookingSchema = new mongoose.Schema({
    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    beneficiaryName: {
        type: String,
        required: true,
        trim: true
    },
    collectorName: {
        type: String,
        required: true,
        trim: true
    },
    userPhone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'returned'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('EquipmentBooking', equipmentBookingSchema);
