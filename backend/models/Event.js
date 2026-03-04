const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    },
    date: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    },
    time: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    },
    dateRaw: { type: String, default: '' },
    timeRaw: { type: String, default: '' },
    loc: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    },
    desc: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    },
    type: {
        type: String,
        default: 'meeting'
    },
    poster: { type: String, default: '' },
    posterCloudinaryId: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
