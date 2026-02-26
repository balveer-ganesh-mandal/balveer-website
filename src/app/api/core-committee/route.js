import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Store metadata locally
const getMetadataFilePath = () => path.join(process.cwd(), 'core-committee-meta.json');

// Initial default data
const defaultData = {
    president: [
        {
            id: "1",
            name: { en: "Shri. Swapnil Dattaprakash Deshpande", mr: "श्री. स्वप्निल दत्तप्रकाश देशपांडे" },
            img: "https://ui-avatars.com/api/?name=President&background=4a0808&color=fceabb&size=150"
        }
    ],
    vicePresident: [
        {
            id: "1",
            name: { en: "Shri. Nilesh Nimbadas Pimparkar", mr: "श्री. निलेश निंबादास पिंपरकर" },
            img: "https://ui-avatars.com/api/?name=Vice+President&background=4a0808&color=fceabb&size=150"
        }
    ],
    coVicePresident: [],
    coreLeaders: [
        {
            id: "1",
            name: { en: "Shri. Ashish Dattaprakash Deshpande", mr: "श्री. आशिष दत्तप्रकाश देशपांडे" },
            role: { en: "Secretary", mr: "सचिव" },
            img: "https://ui-avatars.com/api/?name=Secretary&background=8b0000&color=fceabb&size=150"
        },
        {
            id: "2",
            name: { en: "Shri. Chinmay Chandrakant Deshpande", mr: "श्री. चिन्मय चंद्रकांत देशपांडे" },
            role: { en: "Treasurer", mr: "खजिनदार" },
            img: "https://ui-avatars.com/api/?name=Treasurer&background=8b0000&color=fceabb&size=150"
        }
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

export async function GET() {
    try {
        const metaPath = getMetadataFilePath();
        if (!fs.existsSync(metaPath)) {
            // Create with default data if missing
            fs.writeFileSync(metaPath, JSON.stringify(defaultData));
            return NextResponse.json(defaultData);
        }
        let data = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

        // Data Migration for Array-Based Top Leadership
        let needsMigration = false;

        if (data.president && !Array.isArray(data.president)) {
            data.president = [data.president];
            needsMigration = true;
        } else if (!data.president) {
            data.president = [];
            needsMigration = true;
        }

        if (data.vicePresident && !Array.isArray(data.vicePresident)) {
            data.vicePresident = [data.vicePresident];
            needsMigration = true;
        } else if (!data.vicePresident) {
            data.vicePresident = [];
            needsMigration = true;
        }

        if (!data.coVicePresident || !Array.isArray(data.coVicePresident)) {
            data.coVicePresident = [];
            needsMigration = true;
        }

        if (needsMigration) {
            fs.writeFileSync(metaPath, JSON.stringify(data));
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to read core committee data", error);
        return NextResponse.json(defaultData);
    }
}

export async function POST(request) {
    try {
        const payload = await request.json();
        const { group, action, data } = payload;

        if (!group || !action || !data) {
            return NextResponse.json({ success: false, error: 'Missing required payload structure' }, { status: 400 });
        }

        const metaPath = getMetadataFilePath();
        let currentData = defaultData;

        if (fs.existsSync(metaPath)) {
            currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }

        if (action === "add-member") {
            // Valid for all list groups
            if (!Array.isArray(currentData[group])) {
                return NextResponse.json({ success: false, error: 'Invalid group for list additions' }, { status: 400 });
            }

            const newEntry = {
                id: Date.now().toString(),
                name: { en: data.nameEn, mr: data.nameMr }
            };

            const requiresImgGroups = ["coreLeaders", "president", "vicePresident", "coVicePresident"];
            if (requiresImgGroups.includes(group)) {
                newEntry.img = data.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.nameEn)}&background=8b0000&color=fceabb&size=150`;
                if (data.roleEn && data.roleMr) {
                    newEntry.role = { en: data.roleEn, mr: data.roleMr };
                }
            }

            currentData[group].push(newEntry);
        } else if (action === "edit-member") {
            // Valid for all list groups
            if (!Array.isArray(currentData[group])) {
                return NextResponse.json({ success: false, error: 'Invalid group for editing' }, { status: 400 });
            }
            if (!data.id) {
                return NextResponse.json({ success: false, error: 'Member ID required for editing' }, { status: 400 });
            }

            const index = currentData[group].findIndex(m => m.id === data.id);
            if (index === -1) {
                return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
            }

            currentData[group][index].name = { en: data.nameEn, mr: data.nameMr };

            const requiresImgGroups = ["coreLeaders", "president", "vicePresident", "coVicePresident"];
            if (requiresImgGroups.includes(group)) {
                if (data.roleEn && data.roleMr) {
                    currentData[group][index].role = { en: data.roleEn, mr: data.roleMr };
                }
                if (data.img) {
                    currentData[group][index].img = data.img;
                }
            }
        } else {
            return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
        }

        // Save updated data
        fs.writeFileSync(metaPath, JSON.stringify(currentData));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Update core committee error:", error);
        return NextResponse.json({ success: false, error: 'Update process failed' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const group = searchParams.get('group');
        const id = searchParams.get('id');

        if (!group || !id) {
            return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 });
        }

        const metaPath = getMetadataFilePath();
        if (!fs.existsSync(metaPath)) {
            return NextResponse.json({ success: false, error: 'No data found' }, { status: 404 });
        }

        const currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

        if (!Array.isArray(currentData[group])) {
            return NextResponse.json({ success: false, error: 'Invalid group for deletion' }, { status: 400 });
        }

        const index = currentData[group].findIndex(m => m.id === id);

        if (index === -1) {
            return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
        }

        // Remove the entry
        currentData[group].splice(index, 1);

        // Save updated data
        fs.writeFileSync(metaPath, JSON.stringify(currentData));

        return NextResponse.json({ success: true, deletedId: id });
    } catch (error) {
        console.error("Delete from core committee error:", error);
        return NextResponse.json({ success: false, error: 'Delete process failed' }, { status: 500 });
    }
}
