import mongoose, { Schema, model, models } from "mongoose";

export interface ICourseRegistration {
    _id: string;
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    semester: mongoose.Types.ObjectId;
    status: string;
    advisorApproval: string;
    registeredAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const CourseRegistrationSchema = new Schema<ICourseRegistration>(
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
        status: {
            type: String,
            enum: ["pending", "confirmed", "dropped", "withdrawn"],
            default: "pending",
        },
        advisorApproval: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        registeredAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Prevent duplicate registration for same student+course+semester
CourseRegistrationSchema.index(
    { student: 1, course: 1, semester: 1 },
    { unique: true }
);

export default (models.CourseRegistration as mongoose.Model<ICourseRegistration>) ||
    model<ICourseRegistration>("CourseRegistration", CourseRegistrationSchema);