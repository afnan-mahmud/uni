import mongoose, { Schema, model, models } from "mongoose";

export interface IExam {
    _id: string;
    name: string;
    type: string;
    course: mongoose.Types.ObjectId;
    semester: mongoose.Types.ObjectId;
    date: Date;
    startTime?: string;
    endTime?: string;
    room?: string;
    totalMarks: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
    {
        name: { type: String, required: true, trim: true },
        type: {
            type: String,
            enum: ["midterm", "final", "quiz", "assignment", "viva", "practical"],
            required: true,
        },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        semester: {
            type: Schema.Types.ObjectId,
            ref: "Semester",
            required: true,
        },
        date: { type: Date, required: true },
        startTime: { type: String, trim: true },
        endTime: { type: String, trim: true },
        room: { type: String, trim: true },
        totalMarks: { type: Number, required: true, default: 100 },
        status: {
            type: String,
            enum: ["scheduled", "ongoing", "completed", "cancelled"],
            default: "scheduled",
        },
    },
    { timestamps: true }
);

export default (models.Exam as mongoose.Model<IExam>) ||
    model<IExam>("Exam", ExamSchema);