const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
    year: { type: String, required: true },
    src: { type: String, required: true },
    cloudinaryId: { type: String, default: '' },
    alt: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
