const mongoose = require('mongoose');

const subMemberSchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    },
    role: {
        en: { type: String, default: '' },
        mr: { type: String, default: '' }
    }
}, { _id: true });

const subCommitteeSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    },
    members: [subMemberSchema]
}, { timestamps: true });

module.exports = mongoose.model('SubCommittee', subCommitteeSchema);
