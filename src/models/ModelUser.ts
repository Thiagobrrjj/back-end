import mongoose from "mongoose";

interface IUser {
    email: string;
    password: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
}

export const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;

export { IUser };
