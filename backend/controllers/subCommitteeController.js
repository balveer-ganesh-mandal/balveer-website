const SubCommittee = require('../models/SubCommittee');

// Default sub-committees to seed when collection is empty
const defaultSubCommittees = [
    { title: { en: "Media Committee", mr: "माध्यम समिती" }, members: [] },
    { title: { en: "Event Committee", mr: "कार्यक्रम समिती" }, members: [] },
    { title: { en: "Volunteer Committee", mr: "स्वयंसेवक समिती" }, members: [] }
];

exports.getSubCommittees = async (req, res) => {
    try {
        let committees = await SubCommittee.find().sort({ createdAt: 1 });

        // Seed defaults if collection is empty
        if (committees.length === 0) {
            committees = await SubCommittee.insertMany(defaultSubCommittees);
        }

        const mapped = committees.map(c => {
            const obj = c.toObject();
            obj.id = obj._id.toString();
            obj.members = (obj.members || []).map(m => {
                m.id = m._id.toString();
                return m;
            });
            return obj;
        });
        res.json(mapped);
    } catch (error) {
        console.error('Get sub committees error:', error);
        res.json([]);
    }
};

exports.addSubCommitteeOrMember = async (req, res) => {
    try {
        const { action, subCommitteeId, nameEn, nameMr, roleEn, roleMr, titleEn, titleMr } = req.body;

        if (action === "add-sub-committee") {
            if (!titleEn || !titleMr) return res.status(400).json({ success: false, error: 'Missing titles' });

            const newCommittee = await SubCommittee.create({
                title: { en: titleEn, mr: titleMr },
                members: []
            });

            const obj = newCommittee.toObject();
            obj.id = obj._id.toString();
            return res.json({ success: true, committee: obj });
        }

        // Add member to existing sub-committee
        if (!subCommitteeId || !nameEn || !nameMr) return res.status(400).json({ success: false, error: 'Missing fields' });

        const committee = await SubCommittee.findById(subCommitteeId);
        if (!committee) return res.status(404).json({ success: false, error: 'Not found' });

        const newMemberData = { name: { en: nameEn, mr: nameMr } };
        if (roleEn && roleMr) {
            newMemberData.role = { en: roleEn, mr: roleMr };
        }

        committee.members.push(newMemberData);

        // Sort: Head first, then Jt. Head, then regular members
        const rolePriority = (r) => {
            const role = (r?.en || '').toLowerCase();
            if (role === 'head') return 0;
            if (role.includes('jt') || role.includes('joint')) return 1;
            return 2;
        };
        committee.members.sort((a, b) => rolePriority(a.role) - rolePriority(b.role));

        await committee.save();

        const newMember = committee.members[committee.members.length - 1];
        res.json({ success: true, member: { id: newMember._id.toString(), name: newMember.name, role: newMember.role } });
    } catch (error) {
        console.error('Add sub committee/member error:', error);
        res.status(500).json({ success: false, error: 'Update failed' });
    }
};

exports.deleteSubCommitteeMember = async (req, res) => {
    try {
        const { subCommitteeId, memberId } = req.query;
        if (!subCommitteeId || !memberId) return res.status(400).json({ success: false, error: 'Missing parameters' });

        const committee = await SubCommittee.findById(subCommitteeId);
        if (!committee) return res.status(404).json({ success: false, error: 'Not found' });

        const member = committee.members.id(memberId);
        if (!member) return res.status(404).json({ success: false, error: 'Member not found' });

        committee.members.pull({ _id: memberId });
        await committee.save();

        res.json({ success: true, deletedId: memberId });
    } catch (error) {
        console.error('Delete sub committee member error:', error);
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
