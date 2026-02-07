import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Project from '@/app/lib/models/Project';

export async function GET() {
    try {
        await dbConnect();
        const projects = await Project.find({}).sort({ order: 1 });
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
