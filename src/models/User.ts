import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
    isActive: boolean;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, minlength: 6 },
        role: {
            type: String,
            required: true,
            default: "student",
            enum: [
                "super_admin",
                "admin",
                "registrar",
                "dean",
                "hod",
                "faculty",
                "student",
                "guardian",
                "admission_officer",
                "finance_officer",
                "accountant",
                "hr_officer",
                "examination_officer",
                "librarian",
                "hostel_manager",
                "transport_manager",
                "it_admin",
            ],
        },
        phone: { type: String, trim: true },
        isActive: { type: Boolean, default: true },
        isEmailVerified: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default (models.User as mongoose.Model<IUser>) ||
    model<IUser>("User", UserSchema);