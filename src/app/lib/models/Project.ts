import { Schema, Document, models, model } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    image?: string;
    order: number;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    githubUrl: { type: String, required: true },
    liveUrl: { type: String },
    image: { type: String },
    order: { type: Number, default: 0 },
});

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
