import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Store metadata locally
const getMetadataFilePath = () => path.join(process.cwd(), 'sub-committee-meta.json');

// Initial default data if none exists
const defaultData = [
    {
        id: "media",
        title: { en: "Media Committee", mr: "माध्यम समिती" },
        members: []
    },
    {
        id: "event",
        title: { en: "Event Committee", mr: "कार्यक्रम समिती" },
        members: []
    },
    {
        id: "volunteer",
        title: { en: "Volunteer Committee", mr: "स्वयंसेवक समिती" },
        members: []
    }
];

export async function GET() {
    try {
        const metaPath = getMetadataFilePath();
        if (!fs.existsSync(metaPath)) {
            // Create with default data if missing
            fs.writeFileSync(metaPath, JSON.stringify(defaultData));
            return NextResponse.json(defaultData);
        }
        const data = fs.readFileSync(metaPath, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json(defaultData);
    }
}

export async function POST(request) {
    try {
        const { action, subCommitteeId, nameEn, nameMr, titleEn, titleMr } = await request.json();

        const metaPath = getMetadataFilePath();
        let currentData = defaultData;

        if (fs.existsSync(metaPath)) {
            currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }

        if (action === "add-sub-committee") {
            if (!titleEn || !titleMr) {
                return NextResponse.json({ success: false, error: 'Missing title fields' }, { status: 400 });
            }

            const newId = titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            // Check if ID already exists
            if (currentData.some(c => c.id === newId)) {
                return NextResponse.json({ success: false, error: 'A committee with this name already exists' }, { status: 400 });
            }

            const newCommittee = {
                id: newId,
                title: { en: titleEn, mr: titleMr },
                members: []
            };

            currentData.push(newCommittee);
            fs.writeFileSync(metaPath, JSON.stringify(currentData));

            return NextResponse.json({ success: true, committee: newCommittee });
        }

        // Default: Add Member
        if (!subCommitteeId || !nameEn || !nameMr) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const committeeIndex = currentData.findIndex(c => c.id === subCommitteeId);
        if (committeeIndex === -1) {
            return NextResponse.json({ success: false, error: 'Sub-committee not found' }, { status: 404 });
        }

        const newMember = {
            id: Date.now().toString(),
            name: { en: nameEn, mr: nameMr }
        };

        // Add member to the sub-committee
        currentData[committeeIndex].members.push(newMember);

        // Save updated data
        fs.writeFileSync(metaPath, JSON.stringify(currentData));

        return NextResponse.json({ success: true, member: newMember });
    } catch (error) {
        console.error("Add member error:", error);
        return NextResponse.json({ success: false, error: 'Add member process failed' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const subCommitteeId = searchParams.get('subCommitteeId');
        const memberId = searchParams.get('memberId');

        if (!subCommitteeId || !memberId) {
            return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 });
        }

        const metaPath = getMetadataFilePath();
        if (!fs.existsSync(metaPath)) {
            return NextResponse.json({ success: false, error: 'No data found' }, { status: 404 });
        }

        const currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        const committeeIndex = currentData.findIndex(c => c.id === subCommitteeId);

        if (committeeIndex === -1) {
            return NextResponse.json({ success: false, error: 'Sub-committee not found' }, { status: 404 });
        }

        const memberIndex = currentData[committeeIndex].members.findIndex(m => m.id === memberId);

        if (memberIndex === -1) {
            return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
        }

        // Remove the member
        currentData[committeeIndex].members.splice(memberIndex, 1);

        // Save updated data
        fs.writeFileSync(metaPath, JSON.stringify(currentData));

        return NextResponse.json({ success: true, deletedId: memberId });
    } catch (error) {
        console.error("Delete member error:", error);
        return NextResponse.json({ success: false, error: 'Delete member process failed' }, { status: 500 });
    }
}
