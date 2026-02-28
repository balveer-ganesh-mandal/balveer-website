const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    devotee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Devotee',
        required: [true, 'Devotee ID is required']
    },
    amount: {
        type: Number,
        required: [true, 'Donation amount is required'],
        min: [1, 'Donation must be at least 1']
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR', 'USD', 'EUR']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        enum: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash', 'Mock']
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'completed'
    },
    receiptGenerated: {
        type: Boolean,
        default: false
    },
    receiptName: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Donation', donationSchema);
