const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./utils/db');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'http://localhost:3000', // Local frontend development
    'https://balveerganeshmandal.vercel.app', // Default Vercel domain
    'https://balveerganeshmandal.online', // Custom GoDaddy domain
    'https://www.balveerganeshmandal.online' // Custom GoDaddy domain (www)
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const coreCommitteeRoutes = require('./routes/coreCommitteeRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const subCommitteeRoutes = require('./routes/subCommitteeRoutes');
const liveStatusRoutes = require('./routes/liveStatusRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/core-committee', coreCommitteeRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/sub-committee', subCommitteeRoutes);
app.use('/api/live-status', liveStatusRoutes);
app.use('/api/inventory', inventoryRoutes);

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Ganpati Mandal Backend API is running' });
});

// Auto-seed inventory if empty
const Inventory = require('./models/Inventory');
const seedInventory = async () => {
    try {
        const count = await Inventory.countDocuments();
        if (count === 0) {
            await Inventory.insertMany([
                {
                    itemType: 'wheelchair',
                    titleEn: 'Wheelchair',
                    titleMr: 'व्हीलचेअर्स',
                    totalUnits: 2,
                    availableUnits: 2
                },
                {
                    itemType: 'walker',
                    titleEn: 'Medical Walker',
                    titleMr: 'मेडिकल वॉकर',
                    totalUnits: 3,
                    availableUnits: 3
                }
            ]);
            console.log('✅ Inventory seeded: 2 Wheelchairs, 3 Walkers');
        }
    } catch (err) {
        console.error('Inventory seed error:', err.message);
    }
};

app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
    seedInventory();
});
