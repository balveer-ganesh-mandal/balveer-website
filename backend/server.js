const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const coreCommitteeRoutes = require('./routes/coreCommitteeRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const subCommitteeRoutes = require('./routes/subCommitteeRoutes');
const liveStatusRoutes = require('./routes/liveStatusRoutes');

// Mount Routes
app.use('/api/core-committee', coreCommitteeRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/sub-committee', subCommitteeRoutes);
app.use('/api/live-status', liveStatusRoutes);

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Ganpati Mandal Backend API is running' });
});

app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});
