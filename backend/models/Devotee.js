const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const devoteeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        trim: true,
        default: 'Devotee'
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Exclude from query results by default
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    role: {
        type: String,
        enum: ['devotee', 'admin'],
        default: 'devotee'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password before saving
devoteeSchema.pre('save', async function () {
    // Only run if password was modified
    if (!this.isModified('password')) return;

    // Hash password with cost of 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
devoteeSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Devotee', devoteeSchema);
