import mongoose, { Document, Schema } from "mongoose";

export interface IPixkey extends Document {
    key: string;
    created_at?: Date;
    updated_at?: Date;
}

const pixKeySchema: Schema = new mongoose.Schema({
    key: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const PixKey = mongoose.model<IPixkey>("PixKey", pixKeySchema);

export default PixKey;
