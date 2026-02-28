const fs = require('fs');
const { getDataFilePath } = require('../utils/fileStorage');

const coreCommitteeDefault = {
    president: [{ id: "1", name: { en: "Shri. Swapnil Dattaprakash Deshpande", mr: "श्री. स्वप्निल दत्तप्रकाश देशपांडे" }, img: "https://ui-avatars.com/api/?name=President&background=4a0808&color=fceabb&size=150" }],
    vicePresident: [{ id: "1", name: { en: "Shri. Nilesh Nimbadas Pimparkar", mr: "श्री. निलेश निंबादास पिंपरकर" }, img: "https://ui-avatars.com/api/?name=Vice+President&background=4a0808&color=fceabb&size=150" }],
    coVicePresident: [],
    coreLeaders: [
        { id: "1", name: { en: "Shri. Ashish Dattaprakash Deshpande", mr: "श्री. आशिष दत्तप्रकाश देशपांडे" }, role: { en: "Secretary", mr: "सचिव" }, img: "https://ui-avatars.com/api/?name=Secretary&background=8b0000&color=fceabb&size=150" },
        { id: "2", name: { en: "Shri. Chinmay Chandrakant Deshpande", mr: "श्री. चिन्मय चंद्रकांत देशपांडे" }, role: { en: "Treasurer", mr: "खजिनदार" }, img: "https://ui-avatars.com/api/?name=Treasurer&background=8b0000&color=fceabb&size=150" }
    ],
    advisors: [
        { id: "1", name: { en: "Shri. Rajabhau Sonaji Dawale", mr: "श्री. राजाभाऊ सोनाजी डवले" } },
        { id: "2", name: { en: "Shri. Gajendra Namdevrao Dawale", mr: "श्री. गजेंद्र नामदेवराव डवले" } },
        { id: "3", name: { en: "Shri. Yogesh Namdevrao Dawale", mr: "श्री. योगेश नामदेवराव डवले" } }
    ],
    members: [
        { id: "1", name: { en: "Shri. Golubhau Umak", mr: "श्री. गोलूभाऊ उमक" } },
        { id: "2", name: { en: "Shri. Nilesh Purushottam Dawale", mr: "श्री. निलेश पुरुषोत्तम डवले" } },
        { id: "3", name: { en: "Shri. Sandeep Narayan Jamode", mr: "श्री. संदीप नारायण जामोदे" } },
        { id: "4", name: { en: "Shri. Pravin Narayansingh Rajput", mr: "श्री. प्रवीण नारायणसिंग राजपुत" } },
        { id: "5", name: { en: "Shri. Anil Ramrao Joshi", mr: "श्री. अनिल रामराव जोशी" } },
        { id: "6", name: { en: "Shri. Rajesh Suradkar", mr: "श्री. राजेश सुरडकर" } },
        { id: "7", name: { en: "Shri. Pratik Gajanan Ingle", mr: "श्री. प्रतीक गजानन इंगळे" } },
        { id: "8", name: { en: "Shri. Pavan Digambar Honale", mr: "श्री. पवन दिगंबर होनाळे" } }
    ]
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
