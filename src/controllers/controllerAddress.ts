import { Request, Response } from "express";
import Address, { IAddress } from "../models/modelAddress";

export const registerAddress = async (req: Request, res: Response) => {
    const { cep, rua, numero, ...rest } = req.body;

    try {
        const newAddress = new Address({
            cep: cep,
            rua: rua,
            numero: numero,
            ...rest,
        });
        await newAddress.save();
        res.status(201).json({ message: "Endereço criado com sucesso" });
    } catch (err) {
        console.error("Error ao cadastrar endereço: ", err);
        res.status(500).json({ err: "internal server error create address" });
    }
};

export const singleAddress = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const singleAddress = await Address.findById(id);
        res.status(200).json(singleAddress);
    } catch (err) {
        console.error("Error ao buscar endereço: ", err);
        res.status(500).json({ err: "internal server error get address" });
    }
};

export const allAddresses = async (req: Request, res: Response) => {
    try {
        const allAddresses = await Address.find();
        res.status(200).json(allAddresses);
    } catch (err) {
        console.error("Error ao chamar endereços: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};

export const updatedAddress = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    try {
        const addressData = req.body as IAddress;
        const updateAddress = await Address.findByIdAndUpdate(id, addressData, {
            new: true,
        });
        res.status(200).json(updateAddress);
    } catch (err) {
        console.error("Error ao atualizar endereço: ", err);
        res.status(500).json({ err: "internal server error updated address" });
    }
};

export const deleteAddress = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Address.findByIdAndDelete(id);
        res.status(200).json({ message: "Endereço deletado com sucesso" });
    } catch (err) {
        console.error("Error ao deletar endereço: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};
