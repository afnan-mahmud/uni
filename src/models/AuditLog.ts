import mongoose, { Schema, model, models } from "mongoose";

export interface IAuditLog {
    _id: string;
    user: mongoose.Types.ObjectId;
    action: string;
    module: string;
    recordId?: string;
    oldValue?: unknown;
    newValue?: unknown;
    ipAddress?: string;
    device?: string;
    createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        action: { type: String, required: true, trim: true },
        module: { type: String, required: true, trim: true },
        recordId: { type: String, trim: true },
        oldValue: { type: Schema.Types.Mixed },
        newValue: { type: Schema.Types.Mixed },
        ipAddress: { type: String, trim: true },
        device: { type: String, trim: true },
    },
    { timestamps: true }
);

AuditLogSchema.index({ user: 1, createdAt: -1 });
AuditLogSchema.index({ module: 1, action: 1 });

export default (models.AuditLog as mongoose.Model<IAuditLog>) ||
    model<IAuditLog>("AuditLog", AuditLogSchema);