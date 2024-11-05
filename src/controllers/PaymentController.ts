import { Request, Response } from "express";
import Payment from "../models/ModelPaymentCard";

export const createPayment = async (req: Request, res: Response) => {
  const {
    phone,
    email,
    plots,
    cardNumber,
    expirationDate,
    CVV,
    CPF,
    CEP,
    nameInCard,
  } = req.body;

  const newPayment = new Payment({
    phone,
    email,
    plots,
    nameInCard,
    cardNumber,
    expirationDate,
    CVV,
    CPF,
    CEP,
  });

  try {
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    console.error("Error creating: ", err);
    res.status(500).json({ err: "internal server error create" });
  }
};

export const allPayments = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.find();
    res.status(200).json(payment);
  } catch (err) {
    console.error("Error ao chamar usuario: ", err);
    res.status(500).json({ err: "internal server error create" });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const deletedProduct = await Payment.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
    res.status(500).json({
      error: "Erro interno do servidor ao excluir produto",
    });
  }
};
