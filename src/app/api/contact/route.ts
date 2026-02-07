import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Contact from '@/app/lib/models/Contact';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        // 1. Connect to Database
        await dbConnect();

        // 2. Save to MongoDB
        const newContact = await Contact.create({
            name,
            email,
            message,
        });

        // 3. Send Email Notification (Optional but recommended)
        // To enable this, add EMAIL_USER and EMAIL_PASS to your .env.local
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'rashminkavindya2@gmail.com', // Your email
                subject: `New Portfolio Message from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                replyTo: email
            };

            await transporter.sendMail(mailOptions);
        }

        return NextResponse.json(
            { message: "Contact form submitted and saved successfully", id: newContact._id },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Contact Submission Error:', error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
