import mongoose, { Schema, model, models } from "mongoose";

export interface INotification {
    _id: string;
    user: mongoose.Types.ObjectId;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        type: {
            type: String,
            enum: [
                "admission",
                "payment",
                "fee_due",
                "exam",
                "result",
                "attendance",
                "notice",
                "registration",
                "hostel",
                "general",
            ],
            default: "general",
        },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

NotificationSchema.index({ user: 1, isRead: 1 });

export default (models.Notification as mongoose.Model<INotification>) ||
    model<INotification>("Notification", NotificationSchema);