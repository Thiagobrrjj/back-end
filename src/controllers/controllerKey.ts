import { Request, Response } from "express";
import PixKey from "../models/ModelKey";

export const createPixKey = async (req: Request, res: Response) => {
    const { key } = req.body;

    try {
        const existingKey = await PixKey.findOne();
        if (existingKey) {
            return res.status(400).json({
                message:
                    "Você já possui uma chave PIX. Edite ou exclua a chave existente para criar uma nova.",
            });
        }

        const newPixKey = new PixKey({ key });
        await newPixKey.save();

        res.status(201).json({ message: "Chave pix criada com sucesso" });
    } catch (err) {
        console.error("Error creating key: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};

export const updatePixKey = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { key } = req.body;

    try {
        const existingKey = await PixKey.findById(id);
        if (!existingKey) {
            return res
                .status(404)
                .json({ message: "Chave PIX não encontrada" });
        }

        // Atualiza a chave PIX existente
        existingKey.key = key;
        await existingKey.save();

        res.status(200).json({ message: "Chave PIX atualizada com sucesso" });
    } catch (err) {
        console.error("Erro ao atualizar chave PIX: ", err);
        res.status(500).json({
            error: "Erro interno do servidor ao atualizar chave PIX",
        });
    }
};

export const allKeys = async (req: Request, res: Response) => {
    try {
        const keys = await PixKey.find();
        res.status(200).json(keys);
    } catch (err) {
        console.error("Error ao chamar chaves: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};

export const keyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const key = await PixKey.findById(id);

        if (!key) {
            return res
                .status(404)
                .json({ message: "Chave pix não encontrada" });
        }

        res.status(200).json(key);
    } catch (err) {
        console.error("Error ao chamar chave: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};

export const deletePixKey = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    try {
        const existingKey = await PixKey.findByIdAndDelete(id);
        if (!existingKey) {
            return res
                .status(404)
                .json({ message: "Chave PIX não encontrada" });
        }

        res.status(200).json({ message: "Chave PIX excluída com sucesso" });
    } catch (err) {
        console.error("Erro ao excluir chave PIX: ", err);
        res.status(500).json({
            error: "Erro interno do servidor ao excluir chave PIX",
        });
    }
};
