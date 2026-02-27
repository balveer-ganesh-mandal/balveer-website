import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getMetadataFilePath = () => path.join(process.cwd(), 'events-meta.json');

const defaultData = [
    {
        id: "go2026",
        title: { en: "Ganeshotsav 2026 Preparations", mr: "गणेशोत्सव २०२६ पूर्वतयारी" },
        date: { en: "August 15, 2026", mr: "१५ ऑगस्ट २०२६" },
        time: { en: "10:00 AM Onwards", mr: "सकाळी १०:०० पासून" },
        loc: { en: "Mandal Karyalay, Malkapur", mr: "मंडळ कार्यालय, मलकापूर" },
        desc: {
            en: "Kickoff meeting and volunteer drive for the upcoming grand Ganeshotsav. All devotees are welcome to participate.",
            mr: "आगामी भव्य गणेशोत्सवासाठी स्वयंसेवक नोंदणी आणि नियोजन बैठक. सर्व भाविकांचे स्वागत आहे."
        },
        type: "meeting"
    },
    {
        id: "blood2026",
        title: { en: "Maha Raktadan Shibir", mr: "महारक्तदान शिबिर" },
        date: { en: "September 02, 2026", mr: "०२ सप्टेंबर २०२६" },
        time: { en: "09:00 AM to 04:00 PM", mr: "सकाळी ०९:०० ते संध्याकाळी ०४:००" },
        loc: { en: "Main Pandal Area", mr: "मुख्य मंडप परिसर" },
        desc: {
            en: "A mega blood donation drive held annually. Let's contribute for a noble cause and save lives.",
            mr: "दरवर्षीप्रमाणे आयोजित महारक्तदान शिबिर. एका उदात्त कार्यासाठी योगदान देऊया आणि जीवन वाचवूया."
        },
        type: "social"
    }
];

export async function GET() {
    try {
        const metaPath = getMetadataFilePath();
        if (!fs.existsSync(metaPath)) {
            fs.writeFileSync(metaPath, JSON.stringify(defaultData, null, 2));
            return NextResponse.json(defaultData);
        }
        const data = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to read events data", error);
        return NextResponse.json(defaultData);
    }
}

export async function POST(request) {
    try {
        const payload = await request.json();
        const { action, eventData } = payload;

        if (!action || !eventData) {
            return NextResponse.json({ success: false, error: 'Missing required payload' }, { status: 400 });
        }

        const metaPath = getMetadataFilePath();
        let currentData = defaultData;

        if (fs.existsSync(metaPath)) {
            currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }

        if (action === "add-event") {
            const newEvent = {
                id: Date.now().toString(),
                ...eventData
            };
            // Prepend to show newest first
            currentData.unshift(newEvent);
        } else if (action === "edit-event") {
            if (!eventData.id) {
                return NextResponse.json({ success: false, error: 'Event ID required' }, { status: 400 });
            }
            const index = currentData.findIndex(e => e.id === eventData.id);
            if (index === -1) {
                return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
            }
            currentData[index] = { ...currentData[index], ...eventData };
        } else {
            return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
        }

        fs.writeFileSync(metaPath, JSON.stringify(currentData, null, 2));
        return NextResponse.json({ success: true, event: eventData });
    } catch (error) {
        console.error("Update events failed:", error);
        return NextResponse.json({ success: false, error: 'Server error adding event' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing event ID' }, { status: 400 });
        }

        const metaPath = getMetadataFilePath();
        if (!fs.existsSync(metaPath)) {
            return NextResponse.json({ success: false, error: 'Database not found' }, { status: 404 });
        }

        const currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        const index = currentData.findIndex(e => e.id === id);

        if (index === -1) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }

        currentData.splice(index, 1);
        fs.writeFileSync(metaPath, JSON.stringify(currentData, null, 2));

        return NextResponse.json({ success: true, deletedId: id });
    } catch (error) {
        console.error("Delete event failed:", error);
        return NextResponse.json({ success: false, error: 'Server error deleting' }, { status: 500 });
    }
}
