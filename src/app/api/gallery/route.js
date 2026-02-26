import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Store metadata locally
const getMetadataFilePath = () => path.join(process.cwd(), 'gallery-meta.json');

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Initial default data if none exists
const defaultData = [
    { id: 1, year: "2024", src: "/cpg.png", alt: { en: "Ganpati 2024", mr: "गणपती २०२४" } },
    { id: 3, year: "2023", src: "/cpg.png", alt: { en: "Ganpati 2023", mr: "गणपती २०२३" } },
    { id: 5, year: "2022", src: "/cpg.png", alt: { en: "Ganpati 2022", mr: "गणपती २०२२" } },
    { id: 7, year: "2021", src: "/cpg.png", alt: { en: "Ganpati 2021", mr: "गणपती २०२१" } },
    { id: 9, year: "2020", src: "/cpg.png", alt: { en: "Ganpati 2020", mr: "गणपती २०२०" } },
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
        const formData = await request.formData();
        const imageFile = formData.get('image');
        const year = formData.get('year');
        const altEn = formData.get('altEn');
        const altMr = formData.get('altMr');

        if (!imageFile || !year || !altEn || !altMr) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Generate weird name and save file
        const fileExt = imageFile.name.split('.').pop() || 'jpg';
        const fileName = `gallery-${Date.now()}.${fileExt}`;
        const filePath = path.join(uploadDir, fileName);

        const buffer = Buffer.from(await imageFile.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        // Read and update metadata
        const metaPath = getMetadataFilePath();
        let currentData = defaultData;
        if (fs.existsSync(metaPath)) {
            currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }

        const newImage = {
            id: Date.now(),
            year: year,
            src: `/uploads/${fileName}`,
            alt: { en: altEn, mr: altMr }
        };

        // Prepend new image
        const updatedData = [newImage, ...currentData];
        fs.writeFileSync(metaPath, JSON.stringify(updatedData));

        return NextResponse.json({ success: true, image: newImage });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, error: 'Upload process failed' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing image ID' }, { status: 400 });
        }

        const metaPath = getMetadataFilePath();
        if (!fs.existsSync(metaPath)) {
            return NextResponse.json({ success: false, error: 'No gallery data found' }, { status: 404 });
        }

        const currentData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        const imageToDelete = currentData.find(img => img.id.toString() === id);

        if (!imageToDelete) {
            return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
        }

        // Remove from array
        const updatedData = currentData.filter(img => img.id.toString() !== id);
        fs.writeFileSync(metaPath, JSON.stringify(updatedData));

        // Optionally delete the physical file
        try {
            if (imageToDelete.src.startsWith('/uploads/')) {
                const fileName = imageToDelete.src.split('/').pop();
                const filePath = path.join(uploadDir, fileName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        } catch (fileError) {
            console.error("Failed to delete physical file:", fileError);
            // non-fatal, proceed with returning success
        }

        return NextResponse.json({ success: true, deletedId: id });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ success: false, error: 'Delete process failed' }, { status: 500 });
    }
}
