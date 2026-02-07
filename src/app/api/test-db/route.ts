import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({
            status: 'success',
            message: 'Successfully connected to MongoDB Atlas!'
        }, { status: 200 });
    } catch (error: unknown) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to connect to MongoDB Atlas.',
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
