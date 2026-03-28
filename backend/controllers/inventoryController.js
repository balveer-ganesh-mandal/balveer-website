const Inventory = require('../models/Inventory');
const EquipmentBooking = require('../models/EquipmentBooking');

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
exports.addOrUpdateInventory = async (req, res) => {
    try {
        const { id, itemType, titleEn, titleMr, totalUnits, availableUnits } = req.body;
        
        if (id) {
            const updateData = {
                itemType,
                titleEn,
                titleMr,
                totalUnits: Number(totalUnits),
                availableUnits: Number(availableUnits)
            };
            
            const updatedItem = await Inventory.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedItem) return res.status(404).json({ success: false, error: 'Item not found' });
            
            return res.json({ success: true, item: updatedItem });
        }

        const newItem = new Inventory({
            itemType,
            titleEn,
            titleMr,
            totalUnits: Number(totalUnits),
            availableUnits: Number(availableUnits)
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

// GET /api/inventory/bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await EquipmentBooking.find({ status: 'active' }).populate('equipmentId').sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error fetching bookings' });
    }
};

// POST /api/inventory/book
exports.bookEquipment = async (req, res) => {
    try {
        const { equipmentId, beneficiaryName, collectorName, userPhone, address } = req.body;
        
        const item = await Inventory.findById(equipmentId);
        if (!item) return res.status(404).json({ success: false, error: 'Equipment not found' });

        if (item.availableUnits <= 0) {
            return res.status(400).json({ success: false, error: 'Equipment out of stock right now' });
        }

        // Create booking
        const newBooking = new EquipmentBooking({
            equipmentId,
            beneficiaryName,
            collectorName,
            userPhone,
            address,
            status: 'active'
        });
        await newBooking.save();

        // Reduce availability
        item.availableUnits -= 1;
        await item.save();

        res.status(201).json({ success: true, booking: newBooking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error processing booking' });
    }
};

// POST /api/inventory/return/:bookingId
exports.returnEquipment = async (req, res) => {
    try {
        const { bookingId } = req.params;
        
        const booking = await EquipmentBooking.findById(bookingId);
        if (!booking || booking.status === 'returned') {
            return res.status(404).json({ success: false, error: 'Booking not found or already returned' });
        }

        // Increase inventory
        const item = await Inventory.findById(booking.equipmentId);
        if (item) {
            item.availableUnits += 1;
            await item.save();
        }

        // Mark as returned
        booking.status = 'returned';
        await booking.save();

        res.json({ success: true, message: 'Item returned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error processing return' });
    }
};
