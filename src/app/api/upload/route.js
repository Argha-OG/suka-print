import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ error: "No image file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replace(/\s/g, '_');
        
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        
        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore if exists
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        
        // The frontend expects the raw URL string back or an object?
        // In the frontend: const { data } = await api.post('/upload', uploadData); onUpload(`${getRawBaseURL()}${data}`);
        // If we return just a string via NextResponse.json(), it parses as a string.
        return NextResponse.json(`/uploads/${filename}`, { status: 201 });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ message: "Failed to upload file", error: error.message }, { status: 500 });
    }
}
