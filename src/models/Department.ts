import mongoose, { Schema, model, models } from "mongoose";

export interface IDepartment {
    _id: string;
    name: string;
    code: string;
    faculty: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
    {
        name: { type: String, required: true, trim: true },
        code: { type: String, required: true, unique: true, uppercase: true },
        faculty: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
    },
    { timestamps: true }
);

export default (models.Department as mongoose.Model<IDepartment>) ||
    model<IDepartment>("Department", DepartmentSchema);