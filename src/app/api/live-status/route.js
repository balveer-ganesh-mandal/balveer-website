import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const dataFilePath = path.join(process.cwd(), 'live-status.json');
        if (!fs.existsSync(dataFilePath)) {
            // Default state
            fs.writeFileSync(dataFilePath, JSON.stringify({ isLive: true }));
            return NextResponse.json({ isLive: true });
        }
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ isLive: false });
    }
}

export async function POST(request) {
    try {
        const { isLive } = await request.json();
        const dataFilePath = path.join(process.cwd(), 'live-status.json');
        fs.writeFileSync(dataFilePath, JSON.stringify({ isLive }));
        return NextResponse.json({ success: true, isLive });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
    }
}
