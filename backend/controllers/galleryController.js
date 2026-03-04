const GalleryImage = require('../models/GalleryImage');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const path = require('path');

exports.getGallery = async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ createdAt: -1 });
        const mapped = images.map(img => {
            const obj = img.toObject();
            obj.id = obj._id.toString();
            return obj;
        });
        res.json(mapped);
    } catch (error) {
        console.error('Get gallery error:', error);
        res.json([]);
    }
};

exports.addGalleryImage = async (req, res) => {
    try {
        const imageFile = req.file;
        const { year, altEn, altMr } = req.body;

        if (!imageFile || !year || !altEn || !altMr) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const newImage = await GalleryImage.create({
            year: year,
            src: req.file.path,
            cloudinaryId: req.file.filename,
            alt: { en: altEn, mr: altMr }
        });

        const obj = newImage.toObject();
        obj.id = obj._id.toString();
        res.json({ success: true, image: obj });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: 'Upload failed' });
    }
};

exports.deleteGalleryImage = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ success: false, error: 'Missing ID' });

        const image = await GalleryImage.findById(id);
        if (!image) return res.status(404).json({ success: false, error: 'Image not found' });

        // Delete from Cloudinary if it has a cloudinaryId
        try {
            if (image.cloudinaryId) {
                await cloudinary.uploader.destroy(image.cloudinaryId);
            } else if (image.src && image.src.startsWith('/uploads/')) {
                // Legacy: delete local file
                const fileName = image.src.split('/').pop();
                const filePath = path.join(__dirname, '..', 'public', 'uploads', fileName);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        } catch (e) {
            console.error('Error deleting image file:', e);
        }

        await GalleryImage.findByIdAndDelete(id);
        res.json({ success: true, deletedId: id });
    } catch (error) {
        console.error('Gallery delete error:', error);
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
