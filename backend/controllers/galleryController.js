const fs = require('fs');
const path = require('path');
const { getDataFilePath } = require('../utils/fileStorage');

const galleryDefault = [
    { id: 1, year: "2024", src: "/cpg.png", alt: { en: "Ganpati 2024", mr: "गणपती २०२४" } },
    { id: 3, year: "2023", src: "/cpg.png", alt: { en: "Ganpati 2023", mr: "गणपती २०२३" } },
    { id: 5, year: "2022", src: "/cpg.png", alt: { en: "Ganpati 2022", mr: "गणपती २०२२" } },
    { id: 7, year: "2021", src: "/cpg.png", alt: { en: "Ganpati 2021", mr: "गणपती २०२१" } },
    { id: 9, year: "2020", src: "/cpg.png", alt: { en: "Ganpati 2020", mr: "गणपती २०२०" } }
];

exports.getGallery = (req, res) => {
    try {
        const metaPath = getDataFilePath('gallery-meta.json');
        if (!fs.existsSync(metaPath)) {
            fs.writeFileSync(metaPath, JSON.stringify(galleryDefault));
            return res.json(galleryDefault);
        }
        res.json(JSON.parse(fs.readFileSync(metaPath, 'utf8')));
    } catch (error) {
        res.json(galleryDefault);
    }
};

exports.addGalleryImage = (req, res) => {
    try {
        const imageFile = req.file;
        const { year, altEn, altMr } = req.body;

        if (!imageFile || !year || !altEn || !altMr) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const fileName = req.file.filename;

        const metaPath = getDataFilePath('gallery-meta.json');
        let currentData = galleryDefault;
        if (fs.existsSync(metaPath)) {
            currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }

        const newImage = {
            id: Date.now(),
            year: year,
            src: `/uploads/${fileName}`,
            alt: { en: altEn, mr: altMr }
        };

        const updatedData = [newImage, ...currentData];
        fs.writeFileSync(metaPath, JSON.stringify(updatedData));

        res.json({ success: true, image: newImage });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Upload failed' });
    }
};

exports.deleteGalleryImage = (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ success: false, error: 'Missing ID' });

        const metaPath = getDataFilePath('gallery-meta.json');
        if (!fs.existsSync(metaPath)) return res.status(404).json({ success: false, error: 'No data found' });

        const currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        const imageToDelete = currentData.find(img => img.id.toString() === id);

        if (!imageToDelete) return res.status(404).json({ success: false, error: 'Image not found' });

        const updatedData = currentData.filter(img => img.id.toString() !== id);
        fs.writeFileSync(metaPath, JSON.stringify(updatedData));

        try {
            if (imageToDelete.src.startsWith('/uploads/')) {
                const fileName = imageToDelete.src.split('/').pop();
                const filePath = path.join(__dirname, '..', 'public', 'uploads', fileName);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        } catch (e) { }

        res.json({ success: true, deletedId: id });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
