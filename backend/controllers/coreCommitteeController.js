const CoreCommittee = require('../models/CoreCommittee');

// Helper: Get or create the singleton core committee document
const getOrCreateDoc = async () => {
    let doc = await CoreCommittee.findOne({ docId: 'core-committee' });
    if (!doc) {
        doc = await CoreCommittee.create({
            docId: 'core-committee',
            president: [],
            vicePresident: [],
            coVicePresident: [],
            coreLeaders: [],
            advisors: [],
            members: [],
            pastPresident: [],
            pastVicePresident: [],
            pastSecretary: [],
            pastTreasurer: [],
            pastMembers: []
        });
    } else {
        // Initialize new arrays for legacy documents
        const groups = ['president', 'vicePresident', 'coVicePresident', 'coreLeaders', 'advisors', 'members', 'pastPresident', 'pastVicePresident', 'pastSecretary', 'pastTreasurer', 'pastMembers'];
        let modified = false;
        groups.forEach(g => {
            if (!doc[g]) {
                doc[g] = [];
                modified = true;
            }
        });
        if (modified) {
            await doc.save();
        }
    }
    return doc;
};

// Helper: Format response to match frontend expectations (subdoc _id -> id)
const formatResponse = (doc) => {
    const obj = doc.toObject();
    const groups = ['president', 'vicePresident', 'coVicePresident', 'coreLeaders', 'advisors', 'members', 'pastPresident', 'pastVicePresident', 'pastSecretary', 'pastTreasurer', 'pastMembers'];
    groups.forEach(group => {
        if (Array.isArray(obj[group])) {
            obj[group] = obj[group].map(m => {
                m.id = m._id.toString();
                return m;
            });
        }
    });
    return obj;
};

exports.getCoreCommittee = async (req, res) => {
    try {
        const doc = await getOrCreateDoc();
        res.json(formatResponse(doc));
    } catch (error) {
        console.error('Get core committee error:', error);
        res.json({ president: [], vicePresident: [], coVicePresident: [], coreLeaders: [], advisors: [], members: [] });
    }
};

exports.updateCoreCommitteeData = async (req, res) => {
    try {
        let { group, action, data } = req.body;
        // When sent via FormData, data may be a JSON string
        if (typeof data === 'string') {
            try { data = JSON.parse(data); } catch (e) { }
        }
        if (!group || !action || !data) {
            return res.status(400).json({ success: false, error: 'Missing required payload structure' });
        }

        // If an image file was uploaded via Cloudinary, use it
        if (req.file) {
            data.img = req.file.path; // Cloudinary URL
        }

        const doc = await getOrCreateDoc();

        if (!Array.isArray(doc[group])) {
            return res.status(400).json({ success: false, error: 'Invalid group' });
        }

        if (action === "add-member") {
            const newEntry = { name: { en: data.nameEn, mr: data.nameMr } };
            const requiresImgGroups = ["coreLeaders", "president", "vicePresident", "coVicePresident", "pastPresident", "pastVicePresident", "pastSecretary", "pastTreasurer"];

            if (requiresImgGroups.includes(group)) {
                newEntry.img = data.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.nameEn)}&background=8b0000&color=fceabb&size=150`;
                if (data.roleEn && data.roleMr) {
                    newEntry.role = { en: data.roleEn, mr: data.roleMr };
                }
            }

            // Insert after last member with same role (for coreLeaders)
            let inserted = false;
            if (group === "coreLeaders" && newEntry.role && newEntry.role.en) {
                let lastMatchingRoleIndex = -1;
                for (let i = 0; i < doc[group].length; i++) {
                    const m = doc[group][i];
                    if (m.role && m.role.en.toLowerCase().trim() === newEntry.role.en.toLowerCase().trim()) {
                        lastMatchingRoleIndex = i;
                    }
                }
                if (lastMatchingRoleIndex !== -1) {
                    doc[group].splice(lastMatchingRoleIndex + 1, 0, newEntry);
                    inserted = true;
                }
            }
            if (!inserted) {
                doc[group].push(newEntry);
            }
        } else if (action === "edit-member") {
            if (!data.id) return res.status(400).json({ success: false, error: 'Member ID required' });

            const member = doc[group].id(data.id);
            if (!member) return res.status(404).json({ success: false, error: 'Member not found' });

            member.name = { en: data.nameEn, mr: data.nameMr };
            const requiresImgGroups = ["coreLeaders", "president", "vicePresident", "coVicePresident", "pastPresident", "pastVicePresident", "pastSecretary", "pastTreasurer"];
            if (requiresImgGroups.includes(group)) {
                if (data.roleEn && data.roleMr) member.role = { en: data.roleEn, mr: data.roleMr };
                if (data.img) member.img = data.img;
            }
        } else {
            return res.status(400).json({ success: false, error: 'Unknown action' });
        }

        await doc.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Update core committee error:', error);
        res.status(500).json({ success: false, error: 'Update failed' });
    }
};

exports.deleteCoreCommitteeMember = async (req, res) => {
    try {
        const group = req.query.group;
        const id = req.query.id;
        if (!group || !id) return res.status(400).json({ success: false, error: 'Missing parameters' });

        const doc = await getOrCreateDoc();
        if (!Array.isArray(doc[group])) return res.status(400).json({ success: false, error: 'Invalid group' });

        const member = doc[group].id(id);
        if (!member) return res.status(404).json({ success: false, error: 'Member not found' });

        doc[group].pull({ _id: id });
        await doc.save();

        res.json({ success: true, deletedId: id });
    } catch (error) {
        console.error('Delete core committee member error:', error);
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
