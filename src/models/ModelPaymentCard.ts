import mongoose, { Document, Schema } from "mongoose";

export interface PaymentCard extends Document {
  phone: string;
  email: string;
  plots: string;
  cardNumber: number;
  expirationDate: string;
  CVV: number;
  nameInCard: string;
  CPF: string;
  CEP: string;
}

const PaymentSchema: Schema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  plots: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  expirationDate: { type: String, required: true },
  CVV: { type: Number, required: true },
  nameInCard: { type: String, required: true },
  CPF: { type: String, required: true },
  CEP: { type: String, required: true },
});

const Payment = mongoose.model<PaymentCard>("payment", PaymentSchema);

export default Payment;
