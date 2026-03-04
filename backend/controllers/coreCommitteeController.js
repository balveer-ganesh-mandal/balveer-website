const fs = require('fs');
const { getDataFilePath } = require('../utils/fileStorage');

const coreCommitteeDefault = {
    president: [],
    vicePresident: [],
    coVicePresident: [],
    coreLeaders: [],
    advisors: [],
    members: []
};

exports.getCoreCommittee = (req, res) => {
    try {
        const metaPath = getDataFilePath('core-committee-meta.json');
        if (!fs.existsSync(metaPath)) {
            fs.writeFileSync(metaPath, JSON.stringify(coreCommitteeDefault));
            return res.json(coreCommitteeDefault);
        }
        let data = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

        // Migration Check
        let needsMigration = false;
        ['president', 'vicePresident', 'coVicePresident'].forEach(role => {
            if (data[role] && !Array.isArray(data[role])) {
                data[role] = [data[role]];
                needsMigration = true;
            } else if (!data[role]) {
                data[role] = [];
                needsMigration = true;
            }
            data[role] = data[role].map((member, index) => {
                if (!member.id) {
                    needsMigration = true;
                    return { ...member, id: `${role}-legacy-${index}` };
                }
                return member;
            });
        });

        if (needsMigration) {
            fs.writeFileSync(metaPath, JSON.stringify(data));
        }

        res.json(data);
    } catch (error) {
        res.json(coreCommitteeDefault);
    }
};

exports.updateCoreCommitteeData = (req, res) => {
    try {
        const { group, action, data } = req.body;
        if (!group || !action || !data) {
            return res.status(400).json({ success: false, error: 'Missing required payload structure' });
        }

        const metaPath = getDataFilePath('core-committee-meta.json');
        let currentData = coreCommitteeDefault;
        if (fs.existsSync(metaPath)) {
            currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }

        if (action === "add-member") {
            if (!Array.isArray(currentData[group])) return res.status(400).json({ success: false, error: 'Invalid group' });

            const newEntry = { id: Date.now().toString(), name: { en: data.nameEn, mr: data.nameMr } };
            const requiresImgGroups = ["coreLeaders", "president", "vicePresident", "coVicePresident"];

            if (requiresImgGroups.includes(group)) {
                newEntry.img = data.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.nameEn)}&background=8b0000&color=fceabb&size=150`;
                if (data.roleEn && data.roleMr) {
                    newEntry.role = { en: data.roleEn, mr: data.roleMr };
                }
            }

            let inserted = false;
            if (group === "coreLeaders" && newEntry.role && newEntry.role.en) {
                let lastMatchingRoleIndex = -1;
                for (let i = 0; i < currentData[group].length; i++) {
                    const m = currentData[group][i];
                    if (m.role && m.role.en.toLowerCase().trim() === newEntry.role.en.toLowerCase().trim()) {
                        lastMatchingRoleIndex = i;
                    }
                }
                if (lastMatchingRoleIndex !== -1) {
                    currentData[group].splice(lastMatchingRoleIndex + 1, 0, newEntry);
                    inserted = true;
                }
            }
            if (!inserted) {
                currentData[group].push(newEntry);
            }
        } else if (action === "edit-member") {
            if (!Array.isArray(currentData[group])) return res.status(400).json({ success: false, error: 'Invalid group' });
            if (!data.id) return res.status(400).json({ success: false, error: 'Member ID required' });

            const index = currentData[group].findIndex(m => m.id === data.id);
            if (index === -1) return res.status(404).json({ success: false, error: 'Member not found' });

            currentData[group][index].name = { en: data.nameEn, mr: data.nameMr };
            const requiresImgGroups = ["coreLeaders", "president", "vicePresident", "coVicePresident"];
            if (requiresImgGroups.includes(group)) {
                if (data.roleEn && data.roleMr) currentData[group][index].role = { en: data.roleEn, mr: data.roleMr };
                if (data.img) currentData[group][index].img = data.img;
            }
        } else {
            return res.status(400).json({ success: false, error: 'Unknown action' });
        }

        fs.writeFileSync(metaPath, JSON.stringify(currentData));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Update failed' });
    }
};

exports.deleteCoreCommitteeMember = (req, res) => {
    try {
        const group = req.query.group;
        const id = req.query.id;
        if (!group || !id) return res.status(400).json({ success: false, error: 'Missing parameters' });

        const metaPath = getDataFilePath('core-committee-meta.json');
        if (!fs.existsSync(metaPath)) return res.status(404).json({ success: false, error: 'No data found' });

        const currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        if (!Array.isArray(currentData[group])) return res.status(400).json({ success: false, error: 'Invalid group' });

        const index = currentData[group].findIndex(m => String(m.id) === String(id));
        if (index === -1) return res.status(404).json({ success: false, error: 'Member not found' });

        currentData[group].splice(index, 1);
        fs.writeFileSync(metaPath, JSON.stringify(currentData));

        res.json({ success: true, deletedId: id });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
