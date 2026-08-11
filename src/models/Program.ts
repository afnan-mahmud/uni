import mongoose, { Schema, model, models } from "mongoose";

export interface IProgram {
    _id: string;
    name: string;
    code: string;
    department: mongoose.Types.ObjectId;
    durationYears: number;
    totalCredits: number;
    degree: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
    {
        name: { type: String, required: true, trim: true },
        code: { type: String, required: true, unique: true, uppercase: true },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        durationYears: { type: Number, required: true, default: 4 },
        totalCredits: { type: Number, required: true, default: 130 },
        degree: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export default (models.Program as mongoose.Model<IProgram>) ||
    model<IProgram>("Program", ProgramSchema);