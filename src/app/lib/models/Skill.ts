import { Schema, Document, models, model } from 'mongoose';

export interface ISkill extends Document {
    category: string;
    items: string[];
}

const SkillSchema: Schema = new Schema({
    category: { type: String, required: true },
    items: [{ type: String }],
});

const Skill = models.Skill || model<ISkill>('Skill', SkillSchema);

export default Skill;
