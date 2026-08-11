import mongoose, { Schema, model, models } from "mongoose";

export interface ISemester {
    _id: string;
    name: string;
    code: string;
    academicYear: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    registrationOpen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SemesterSchema = new Schema<ISemester>(
    {
        name: { type: String, required: true, trim: true },
        code: { type: String, required: true, unique: true, uppercase: true },
        academicYear: { type: String, required: true, trim: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        isActive: { type: Boolean, default: false },
        registrationOpen: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default (models.Semester as mongoose.Model<ISemester>) ||
    model<ISemester>("Semester", SemesterSchema);