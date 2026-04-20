import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Settings from '@/lib/models/Settings';
import { verifyAdmin } from '@/lib/auth';

// @desc    Get site settings
// @route   GET /api/settings
export async function GET() {
    try {
        await dbConnect();
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// @desc    Update site settings (Admin Only)
// @route   PUT /api/settings
export async function PUT(req) {
    try {
        const auth = await verifyAdmin(req);
        if (!auth.authenticated) {
            return NextResponse.json({ message: auth.message }, { status: auth.status });
        }

        await dbConnect();
        const body = await req.json();
        
        let settings = await Settings.findOne();
        if (settings) {
            settings = await Settings.findByIdAndUpdate(settings._id, body, { new: true });
        } else {
            settings = await Settings.create(body);
        }
        
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
