import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IConversation extends Document {
    sessionId: string; // Could be phone number or unique ID from the requester
    history: Array<{
        role: 'user' | 'model';
        content: string;
        timestamp: Date;
    }>;
    extractedIntel: {
        upi: string[];
        bank_ac: string[];
        links: string[];
    };
    scamDetected: boolean;
    confidence: number;
    metadata: {
        turnCount: number;
        latency_ms?: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ConversationSchema: Schema = new Schema({
    sessionId: { type: String, required: true, unique: true },
    history: [
        {
            role: { type: String, enum: ['user', 'model'], required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    extractedIntel: {
        upi: { type: [String], default: [] },
        bank_ac: { type: [String], default: [] },
        links: { type: [String], default: [] },
    },
    scamDetected: { type: Boolean, default: false },
    confidence: { type: Number, default: 0 },
    metadata: {
        turnCount: { type: Number, default: 0 },
        latency_ms: { type: Number },
    },
}, { timestamps: true });

// Prevent model overwrite error in development
const Conversation: Model<IConversation> = mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
