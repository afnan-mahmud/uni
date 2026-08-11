import mongoose, { Schema, model, models } from "mongoose";

export interface IResult {
    _id: string;
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    semester: mongoose.Types.ObjectId;
    exam: mongoose.Types.ObjectId;
    marksObtained: number;
    grade?: string;
    gradePoint?: number;
    status: string;
    enteredBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ResultSchema = new Schema<IResult>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        semester: {
            type: Schema.Types.ObjectId,
            ref: "Semester",
            required: true,
        },
        exam: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
        marksObtained: { type: Number, required: true, min: 0 },
        grade: { type: String, trim: true },
        gradePoint: { type: Number, min: 0, max: 4 },
        status: {
            type: String,
            enum: ["draft", "submitted", "verified", "approved", "published"],
            default: "draft",
        },
        enteredBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Prevent duplicate result for same student+exam
ResultSchema.index({ student: 1, exam: 1 }, { unique: true });

export default (models.Result as mongoose.Model<IResult>) ||
    model<IResult>("Result", ResultSchema);