import { Request, Response } from "express";
import User from "../models/ModelUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!email) {
        return res.status(422).json({ message: "O email é obrigatório" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória" });
    }

    if (existingUser) {
        return res.status(406).json({ error: "Usuario já cadastrado" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "Usuario criado com sucesso" });
    } catch (err) {
        console.error("Error creating: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};

export const allUsers = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        console.error("Error ao chamar usuario: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ message: "O email é obrigatório" });
    }

    if (!password) {
        return res.status(422).json({ message: "A senha é obrigatória" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ message: "Usuario não encontrado" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ message: "Senha inválida" });
    }

    try {
        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(500).json({
                msg: "Erro interno do servidor: segredo não definido",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        );
        res.status(200).json({ token, _id: user._id });
    } catch (err) {
        console.error("Error ao logar", err);
        res.status(500).json({
            msg: "Aconteceu um erro no servidor, tente novamente mais tarde",
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
        console.error("Error ao deletar usuario: ", err);
        res.status(500).json({ err: "internal server error create" });
    }
};
