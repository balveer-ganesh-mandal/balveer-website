const Event = require('../models/Event');
const cloudinary = require('../utils/cloudinary');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        // Map _id to id for frontend compatibility
        const mapped = events.map(e => {
            const obj = e.toObject();
            obj.id = obj._id.toString();
            return obj;
        });
        res.json(mapped);
    } catch (error) {
        console.error('Get events error:', error);
        res.json([]);
    }
};

exports.addOrUpdateEvent = async (req, res) => {
    try {
        let formattedEvent;

        if (req.body.eventData) {
            let eventData = req.body.eventData;
            if (typeof eventData === 'string') {
                eventData = JSON.parse(eventData);
            }
            formattedEvent = eventData;
        } else if (req.body.titleEn) {
            const { id, titleEn, titleMr, dateEn, dateMr, timeEn, timeMr, locEn, locMr, descEn, descMr, type, dateRaw, timeRaw } = req.body;
            formattedEvent = {
                id: id || null,
                title: { en: titleEn, mr: titleMr },
                date: { en: dateEn, mr: dateMr },
                time: { en: timeEn, mr: timeMr },
                dateRaw: dateRaw || '',
                timeRaw: timeRaw || '',
                loc: { en: locEn, mr: locMr },
                desc: { en: descEn, mr: descMr },
                type: type || 'meeting'
            };
        } else {
            return res.status(400).json({ success: false, error: 'Invalid request format' });
        }

        // Handle poster image upload via Cloudinary
        if (req.file) {
            formattedEvent.poster = req.file.path;
            formattedEvent.posterCloudinaryId = req.file.filename;
        }

        const targetId = formattedEvent.id;

        if (targetId) {
            // Try to find existing event
            const existing = await Event.findById(targetId).catch(() => null);
            if (existing) {
                // Keep old poster if no new one uploaded
                if (!req.file && existing.poster) {
                    formattedEvent.poster = existing.poster;
                    formattedEvent.posterCloudinaryId = existing.posterCloudinaryId;
                }
                // Delete old poster from Cloudinary if replacing
                if (req.file && existing.posterCloudinaryId) {
                    try { await cloudinary.uploader.destroy(existing.posterCloudinaryId); } catch (e) { }
                }
                // Remove id from update data
                delete formattedEvent.id;
                const updated = await Event.findByIdAndUpdate(targetId, formattedEvent, { new: true });
                const obj = updated.toObject();
                obj.id = obj._id.toString();
                return res.json({ success: true, event: obj });
            }
        }

        // Create new event
        delete formattedEvent.id;
        const newEvent = await Event.create(formattedEvent);
        const obj = newEvent.toObject();
        obj.id = obj._id.toString();
        res.json({ success: true, event: obj });
    } catch (error) {
        console.error('Event save error:', error);
        res.status(500).json({ success: false, error: 'Update failed' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ success: false, error: 'Missing ID' });

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ success: false, error: 'Event not found' });

        // Delete poster from Cloudinary if exists
        if (event.posterCloudinaryId) {
            try { await cloudinary.uploader.destroy(event.posterCloudinaryId); } catch (e) { }
        }

        await Event.findByIdAndDelete(id);
        res.json({ success: true, deletedId: id });
    } catch (error) {
        console.error('Event delete error:', error);
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
