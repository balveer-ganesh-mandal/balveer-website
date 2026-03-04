const fs = require('fs');
const { getDataFilePath } = require('../utils/fileStorage');

const subCommitteeDefault = [];

exports.getSubCommittees = (req, res) => {
    try {
        const metaPath = getDataFilePath('sub-committee-meta.json');
        if (!fs.existsSync(metaPath)) {
            fs.writeFileSync(metaPath, JSON.stringify(subCommitteeDefault));
            return res.json(subCommitteeDefault);
        }
        res.json(JSON.parse(fs.readFileSync(metaPath, 'utf8')));
    } catch (error) {
        res.json(subCommitteeDefault);
    }
};

exports.addSubCommitteeOrMember = (req, res) => {
    try {
        const { action, subCommitteeId, nameEn, nameMr, titleEn, titleMr } = req.body;
        const metaPath = getDataFilePath('sub-committee-meta.json');
        let currentData = subCommitteeDefault;

        if (fs.existsSync(metaPath)) {
            currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }

        if (action === "add-sub-committee") {
            if (!titleEn || !titleMr) return res.status(400).json({ success: false, error: 'Missing titles' });

            const newId = titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            if (currentData.some(c => c.id === newId)) return res.status(400).json({ success: false, error: 'Exists already' });

            const newCommittee = { id: newId, title: { en: titleEn, mr: titleMr }, members: [] };
            currentData.push(newCommittee);
            fs.writeFileSync(metaPath, JSON.stringify(currentData));

            return res.json({ success: true, committee: newCommittee });
        }

        if (!subCommitteeId || !nameEn || !nameMr) return res.status(400).json({ success: false, error: 'Missing fields' });

        const committeeIndex = currentData.findIndex(c => c.id === subCommitteeId);
        if (committeeIndex === -1) return res.status(404).json({ success: false, error: 'Not found' });

        const newMember = { id: Date.now().toString(), name: { en: nameEn, mr: nameMr } };
        currentData[committeeIndex].members.push(newMember);

        fs.writeFileSync(metaPath, JSON.stringify(currentData));
        res.json({ success: true, member: newMember });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Update failed' });
    }
};

exports.deleteSubCommitteeMember = (req, res) => {
    try {
        const { subCommitteeId, memberId } = req.query;
        if (!subCommitteeId || !memberId) return res.status(400).json({ success: false, error: 'Missing parameters' });

        const metaPath = getDataFilePath('sub-committee-meta.json');
        if (!fs.existsSync(metaPath)) return res.status(404).json({ success: false, error: 'No data' });

        const currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        const committeeIndex = currentData.findIndex(c => c.id === subCommitteeId);
        if (committeeIndex === -1) return res.status(404).json({ success: false, error: 'Not found' });

        const memberIndex = currentData[committeeIndex].members.findIndex(m => String(m.id) === String(memberId));
        if (memberIndex === -1) return res.status(404).json({ success: false, error: 'Member not found' });

        currentData[committeeIndex].members.splice(memberIndex, 1);
        fs.writeFileSync(metaPath, JSON.stringify(currentData));

        res.json({ success: true, deletedId: memberId });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
