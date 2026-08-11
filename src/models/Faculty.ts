import mongoose, { Schema, model, models } from "mongoose";

export interface IFaculty {
    _id: string;
    facultyId: string;
    user: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone?: string;
    department: mongoose.Types.ObjectId;
    designation: string;
    qualification?: string;
    specialization?: string;
    officeHours?: string;
    courses: mongoose.Types.ObjectId[];
    joinDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const FacultySchema = new Schema<IFaculty>(
    {
        facultyId: { type: String, required: true, unique: true, trim: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        designation: {
            type: String,
            required: true,
            trim: true,
        },
        qualification: { type: String, trim: true },
        specialization: { type: String, trim: true },
        officeHours: { type: String, trim: true },
        courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
        joinDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default (models.Faculty as mongoose.Model<IFaculty>) ||
    model<IFaculty>("Faculty", FacultySchema);