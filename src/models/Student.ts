import mongoose, { Schema, model, models } from "mongoose";

export interface IStudent {
    _id: string;
    studentId: string;
    user: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: string;
    guardianName?: string;
    guardianPhone?: string;
    emergencyContact?: string;
    address?: string;
    department: mongoose.Types.ObjectId;
    program: mongoose.Types.ObjectId;
    batch?: string;
    section?: string;
    semester: string;
    admissionDate?: Date;
    status: string;
    documents?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
    {
        studentId: { type: String, required: true, unique: true, trim: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        dateOfBirth: { type: Date },
        gender: { type: String, enum: ["male", "female", "other"] },
        guardianName: { type: String, trim: true },
        guardianPhone: { type: String, trim: true },
        emergencyContact: { type: String, trim: true },
        address: { type: String, trim: true },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        program: { type: Schema.Types.ObjectId, ref: "Program", required: true },
        batch: { type: String, trim: true },
        section: { type: String, trim: true },
        semester: { type: String, required: true, trim: true },
        admissionDate: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: [
                "applicant",
                "active",
                "suspended",
                "probation",
                "withdrawn",
                "dropped",
                "graduated",
                "expelled",
            ],
            default: "active",
        },
        documents: [{ type: String }],
    },
    { timestamps: true }
);

export default (models.Student as mongoose.Model<IStudent>) ||
    model<IStudent>("Student", StudentSchema);