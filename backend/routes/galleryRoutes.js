const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../middlewares/upload');

router.get('/', galleryController.getGallery);
router.post('/', upload.single('image'), galleryController.addGalleryImage);
router.delete('/', galleryController.deleteGalleryImage);

module.exports = router;
