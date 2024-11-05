import mongoose, { Document } from "mongoose";

export interface IAddress extends Document {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  referencia?: string;
}

const addressSchema = new mongoose.Schema({
  cep: { type: String, required: true },
  rua: { type: String, required: true },
  numero: { type: String, required: true },
  complemento: { type: String },
  referencia: { type: String },
});

const Address = mongoose.model<IAddress>("Address", addressSchema);

export default Address;
