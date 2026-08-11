import mongoose, { Schema, model, models } from "mongoose";

export interface ICourse {
    _id: string;
    code: string;
    name: string;
    credits: number;
    department: mongoose.Types.ObjectId;
    program: mongoose.Types.ObjectId;
    semester: number;
    prerequisites?: mongoose.Types.ObjectId[];
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
    {
        code: { type: String, required: true, unique: true, uppercase: true },
        name: { type: String, required: true, trim: true },
        credits: { type: Number, required: true, min: 1, max: 6 },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        program: { type: Schema.Types.ObjectId, ref: "Program", required: true },
        semester: { type: Number, required: true, min: 1 },
        prerequisites: [{ type: Schema.Types.ObjectId, ref: "Course" }],
        description: { type: String, trim: true },
    },
    { timestamps: true }
);

export default (models.Course as mongoose.Model<ICourse>) ||
    model<ICourse>("Course", CourseSchema);