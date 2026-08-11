import mongoose, { Schema, model, models } from "mongoose";

export interface IPayment {
    _id: string;
    student: mongoose.Types.ObjectId;
    invoiceId: string;
    amount: number;
    feeType: string;
    method: string;
    status: string;
    transactionId?: string;
    paidAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        invoiceId: { type: String, required: true, unique: true, trim: true },
        amount: { type: Number, required: true, min: 0 },
        feeType: {
            type: String,
            required: true,
            enum: [
                "admission",
                "tuition",
                "semester",
                "lab",
                "library",
                "exam",
                "hostel",
                "transport",
                "miscellaneous",
            ],
        },
        method: {
            type: String,
            enum: ["cash", "bank", "card", "mobile_banking", "online"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending",
        },
        transactionId: { type: String, trim: true },
        paidAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default (models.Payment as mongoose.Model<IPayment>) ||
    model<IPayment>("Payment", PaymentSchema);