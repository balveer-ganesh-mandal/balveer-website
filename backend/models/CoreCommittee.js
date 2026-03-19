const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        mr: { type: String, required: true }
    },
    role: {
        en: { type: String },
        mr: { type: String }
    },
    img: { type: String, default: '' }
}, { _id: true });

const coreCommitteeSchema = new mongoose.Schema({
    // Singleton document identifier
    docId: {
        type: String,
        default: 'core-committee',
        unique: true
    },
    president: [memberSchema],
    vicePresident: [memberSchema],
    coVicePresident: [memberSchema],
    coreLeaders: [memberSchema],
    advisors: [memberSchema],
    members: [memberSchema],
    pastPresident: [memberSchema],
    pastVicePresident: [memberSchema],
    pastSecretary: [memberSchema],
    pastTreasurer: [memberSchema],
    pastMembers: [memberSchema]
}, { timestamps: true });

module.exports = mongoose.model('CoreCommittee', coreCommitteeSchema);
