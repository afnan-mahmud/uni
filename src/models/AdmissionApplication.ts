import mongoose, { Schema, model, models } from "mongoose";

export interface IAdmissionApplication {
    _id: string;
    applicantName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    gender: string;
    guardianName: string;
    guardianPhone: string;
    address: string;
    previousInstitution: string;
    previousGPA: number;
    appliedProgram: mongoose.Types.ObjectId;
    appliedSemester: mongoose.Types.ObjectId;
    status: "applied" | "under_review" | "test_scheduled" | "merit_list" | "offered" | "admitted" | "rejected";
    testScore?: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AdmissionApplicationSchema = new Schema<IAdmissionApplication>(
    {
        applicantName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, required: true, trim: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, required: true, enum: ["male", "female", "other"] },
        guardianName: { type: String, required: true, trim: true },
        guardianPhone: { type: String, required: true, trim: true },
        address: { type: String, required: true },
        previousInstitution: { type: String, required: true },
        previousGPA: { type: Number, required: true },
        appliedProgram: { type: Schema.Types.ObjectId, ref: "Program", required: true },
        appliedSemester: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
        status: {
            type: String,
            required: true,
            enum: ["applied", "under_review", "test_scheduled", "merit_list", "offered", "admitted", "rejected"],
            default: "applied",
        },
        testScore: { type: Number },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
);

export default (models.AdmissionApplication as mongoose.Model<IAdmissionApplication>) ||
    model<IAdmissionApplication>("AdmissionApplication", AdmissionApplicationSchema);
