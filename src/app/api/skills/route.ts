import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Skill from '@/app/lib/models/Skill';

export async function GET() {
    try {
        await dbConnect();
        const skills = await Skill.find({});
        return NextResponse.json({ skills }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
