const fs = require('fs');
const { getDataFilePath } = require('../utils/fileStorage');

exports.getLiveStatus = (req, res) => {
    try {
        const metaPath = getDataFilePath('live-status-meta.json');
        if (!fs.existsSync(metaPath)) {
            const defaultStatus = { isLive: false };
            fs.writeFileSync(metaPath, JSON.stringify(defaultStatus));
            return res.json(defaultStatus);
        }
        res.json(JSON.parse(fs.readFileSync(metaPath, 'utf8')));
    } catch (error) {
        res.json({ isLive: false });
    }
};

exports.updateLiveStatus = (req, res) => {
    try {
        const { isLive } = req.body;
        const metaPath = getDataFilePath('live-status-meta.json');
        const newStatus = { isLive: Boolean(isLive) };
        fs.writeFileSync(metaPath, JSON.stringify(newStatus));
        res.json({ success: true, isLive: newStatus.isLive });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Update failed' });
    }
};
