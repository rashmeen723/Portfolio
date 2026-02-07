import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Project from '@/app/lib/models/Project';
import Skill from '@/app/lib/models/Skill';

const initialProjects = [
    {
        title: "Online Election System",
        description: "Developed a secure hybrid election system combining digital and physical voting processes with JWT authentication, household management, and real-time result calculation.",
        technologies: ["Ballerina", "Next.js", "React.js", "PostgreSQL", "JWT"],
        githubUrl: "https://github.com/Online-Election-System",
        liveUrl: "#",
        image: "/images/election.png",
        order: 1
    },
    {
        title: "BuildMate – Local Service Platform",
        description: "Mobile-first platform connecting households, service providers, and suppliers. Implemented RBAC, PostgreSQL database schema, service booking, and UI/UX in Figma.",
        technologies: ["React Native", "Nest.js", "PostgreSQL", "Figma"],
        githubUrl: "https://github.com/rashmeen723/BuiildMate",
        liveUrl: "#",
        image: "/images/buildmate.png",
        order: 2
    },
    {
        title: "Exercise Counting & Fitness Tracker",
        description: "Built a fitness tracker with web frontend, Firebase Realtime Database, and Arduino Nano 33 BLE Sense for ML-based activity recognition.",
        technologies: ["HTML", "CSS", "JavaScript", "Firebase", "Arduino"],
        githubUrl: "https://github.com/sachinthasashikpriya/Arduino-hardware-project",
        liveUrl: "#",
        image: "/images/fitness.png",
        order: 3
    }
];

const initialSkills = [
    {
        category: "Programming Languages",
        items: ["C", "Java", "Python"]
    },
    {
        category: "Frontend Development",
        items: ["React.js", "Next.js", "React Native", "HTML", "CSS", "JavaScript"]
    },
    {
        category: "Backend Development",
        items: ["Node.js", "Express.js", "Nest.js", "Ballerina"]
    },
    {
        category: "Databases",
        items: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"]
    },
    {
        category: "Tools & Platforms",
        items: ["Git", "Figma"]
    }
];

export async function GET() {
    try {
        await dbConnect();

        // Clear existing data to avoid duplicates during seeding
        await Project.deleteMany({});
        await Skill.deleteMany({});

        // Bulk insert initial data
        await Project.insertMany(initialProjects);
        await Skill.insertMany(initialSkills);

        return NextResponse.json({
            status: 'success',
            message: 'Projects and Skills seeded successfully to MongoDB Atlas!'
        }, { status: 200 });
    } catch (error: unknown) {
        console.error('Seeding error:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to seed database.',
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
