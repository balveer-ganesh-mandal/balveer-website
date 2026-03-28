const Inventory = require('../models/Inventory');

// GET /api/inventory
exports.getInventory = async (req, res) => {
    try {
        const items = await Inventory.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error fetching inventory' });
    }
};

// POST /api/inventory
// handles both creation and updates. Form-data required for image upload.
exports.addOrUpdateInventory = async (req, res) => {
    try {
        const { id, itemType, titleEn, titleMr, descriptionEn, descriptionMr, totalUnits, availableUnits } = req.body;
        
        // If an ID is provided, it's an update operation
        if (id) {
            const updateData = {
                itemType,
                titleEn,
                titleMr,
                descriptionEn,
                descriptionMr,
                totalUnits: Number(totalUnits),
                availableUnits: Number(availableUnits)
            };
            
            if (req.file) {
                updateData.imageUrl = `/uploads/${req.file.filename}`;
            }

            const updatedItem = await Inventory.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedItem) return res.status(404).json({ success: false, error: 'Item not found' });
            
            return res.json({ success: true, item: updatedItem });
        }

        // Otherwise create new
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Image is required for new equipment' });
        }

        const newItem = new Inventory({
            itemType,
            titleEn,
            titleMr,
            descriptionEn,
            descriptionMr,
            totalUnits: Number(totalUnits),
            availableUnits: Number(availableUnits),
            imageUrl: `/uploads/${req.file.filename}`
        });

        await newItem.save();
        res.status(201).json({ success: true, item: newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error adding/updating inventory' });
    }
};

// DELETE /api/inventory/:id
exports.deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Inventory.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        res.json({ success: true, message: 'Item deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error deleting item' });
    }
};
