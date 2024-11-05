import { Request, Response } from "express";
import Product, { IProduct } from "../models/ModelProduct";

export const createProduct = async (req: Request, res: Response) => {
    const { nome, preco, descricao, ...rest } = req.body;

    if (!nome) {
        return res.status(422).json({ message: "O nome é obrigatório" });
    }

    if (!preco) {
        return res.status(422).json({ message: "O preço é obrigatório" });
    }

    if (!descricao) {
        return res.status(422).json({ message: "Uma descrição é obrigatória" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
    }
    try {
        const productData: IProduct = {
            nome: nome,
            preco: preco,
            descricao: descricao,
            imagem: `/src/uploads/${req.file.filename}`,
            ...rest,
        };

        const newProduct = new Product(productData);
        await newProduct.save();

        res.status(201).json({
            message: "Produto criado com sucesso",
            product: newProduct,
        });
    } catch (err) {
        console.error("Erro ao criar produto:", err);
        res.status(500).json({
            error: "Erro interno do servidor ao criar produto",
        });
    }
};

export const singleProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const product = await Product.findById(id);

        if (!product) {
            return res
                .status(404)
                .json({ message: "Chave pix não encontrada" });
        }

        res.status(200).json(product);
    } catch (err) {
        console.log("erro ao buscar produto por id", err);
        res.status(500).json({ error: "internal server error" });
    }
};

export const postImage = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
    }

    try {
        const file = req.file;
        const picture = new Product({
            imagem: file.path,
        });

        await picture.save();

        res.status(201).json({ message: "imagem salva com sucesso" });
    } catch (err) {
        console.error("error creating product", err);
        res.status(500).json({ error: "internal server error" });
    }
};

export const allImages = async (req: Request, res: Response) => {
    try {
        const images = await Product.find();
        res.status(200).json(images);
    } catch (err) {
        console.error("Error ao chamar imagens: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};

export const allProducts = async (req: Request, res: Response) => {
    try {
        const Products = await Product.find();
        res.status(201).json(Products);
    } catch (err) {
        console.error("error calling product", err);
        res.status(500).json({ error: "internal server error" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const params = req.params as { id: string };
        const { id } = params;
        const productData = req.body as IProduct;
        const updateProduct = await Product.findByIdAndUpdate(id, {
            ...productData,
            ...(req.file && {
                imagem: `/src/uploads/${req.file.filename}`
            })
        }, {
            new: true,
        });

        if (!updateProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json(updateProduct);
    } catch (err) {
        console.error("error updating product", err);
        res.status(500).json({ error: "internal server error" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const deletedProduct = await Product.findByIdAndDelete(id);

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
