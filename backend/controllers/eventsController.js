const fs = require('fs');
const { getDataFilePath } = require('../utils/fileStorage');

const eventsDefault = [
    {
        id: "go2026",
        title: { en: "Ganeshotsav 2026 Preparations", mr: "गणेशोत्सव २०२६ पूर्वतयारी" },
        date: { en: "August 15, 2026", mr: "१५ ऑगस्ट २०२६" },
        time: { en: "10:00 AM Onwards", mr: "सकाळी १०:०० पासून" },
        loc: { en: "Mandal Karyalay, Malkapur", mr: "मंडळ कार्यालय, मलकापूर" },
        desc: { en: "Kickoff meeting and volunteer drive for the upcoming grand Ganeshotsav. All devotees are welcome to participate.", mr: "आगामी भव्य गणेशोत्सवासाठी स्वयंसेवक नोंदणी आणि नियोजन बैठक. सर्व भाविकांचे स्वागत आहे." },
        type: "meeting"
    },
    {
        id: "blood2026",
        title: { en: "Maha Raktadan Shibir", mr: "महारक्तदान शिबिर" },
        date: { en: "September 02, 2026", mr: "०२ सप्टेंबर २०२६" },
        time: { en: "09:00 AM to 04:00 PM", mr: "सकाळी ०९:०० ते संध्याकाळी ०४:००" },
        loc: { en: "Main Pandal Area", mr: "मुख्य मंडप परिसर" },
        desc: { en: "Annual blood donation camp organized by Balveer Ganesh Mandal in collaboration with local hospitals.", mr: "स्थानिक रुग्णालयांच्या सहकार्याने बालवीर गणेश मंडळाद्वारे आयोजित वार्षिक रक्तदान शिबिर." },
        type: "donation"
    }
];

exports.getEvents = (req, res) => {
    try {
        const metaPath = getDataFilePath('events-meta.json');
        if (!fs.existsSync(metaPath)) {
            fs.writeFileSync(metaPath, JSON.stringify(eventsDefault));
            return res.json(eventsDefault);
        }
        res.json(JSON.parse(fs.readFileSync(metaPath, 'utf8')));
    } catch (error) {
        res.json(eventsDefault);
    }
};

exports.addOrUpdateEvent = (req, res) => {
    try {
        const { id, titleEn, titleMr, dateEn, dateMr, timeEn, timeMr, locEn, locMr, descEn, descMr, type } = req.body;
        const metaPath = getDataFilePath('events-meta.json');

        let currentData = eventsDefault;
        if (fs.existsSync(metaPath)) {
            currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }

        // Handle both flat fields AND { action, eventData } for compatibility with the frontend code.
        let formattedEvent;
        if (req.body.eventData) {
            formattedEvent = req.body.eventData;
            formattedEvent.id = formattedEvent.id || Date.now().toString();
        } else {
            formattedEvent = {
                id: id || Date.now().toString(),
                title: { en: titleEn, mr: titleMr },
                date: { en: dateEn, mr: dateMr },
                time: { en: timeEn, mr: timeMr },
                loc: { en: locEn, mr: locMr },
                desc: { en: descEn, mr: descMr },
                type: type || 'meeting'
            };
        }

        const targetId = formattedEvent.id;

        if (targetId) {
            const index = currentData.findIndex(e => String(e.id) === String(targetId));
            if (index > -1) {
                currentData[index] = formattedEvent;
            } else {
                currentData.push(formattedEvent);
            }
        } else {
            currentData.push(formattedEvent);
        }

        fs.writeFileSync(metaPath, JSON.stringify(currentData));
        res.json({ success: true, event: formattedEvent });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Update failed' });
    }
};

exports.deleteEvent = (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ success: false, error: 'Missing ID' });

        const metaPath = getDataFilePath('events-meta.json');
        if (!fs.existsSync(metaPath)) return res.status(404).json({ success: false, error: 'No data found' });

        let currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        const initLength = currentData.length;
        currentData = currentData.filter(e => String(e.id) !== String(id));

        if (currentData.length === initLength) return res.status(404).json({ success: false, error: 'Event not found' });

        fs.writeFileSync(metaPath, JSON.stringify(currentData));
        res.json({ success: true, deletedId: id });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Delete failed' });
    }
};
