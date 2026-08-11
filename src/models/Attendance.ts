import mongoose, { Schema, model, models } from "mongoose";

export interface IAttendance {
    _id: string;
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    semester: mongoose.Types.ObjectId;
    date: Date;
    status: string;
    markedBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
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
        date: { type: Date, required: true },
        status: {
            type: String,
            enum: ["present", "absent", "late", "leave"],
            required: true,
        },
        markedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Prevent duplicate attendance for same student+course+date
AttendanceSchema.index({ student: 1, course: 1, date: 1 }, { unique: true });

export default (models.Attendance as mongoose.Model<IAttendance>) ||
    model<IAttendance>("Attendance", AttendanceSchema);