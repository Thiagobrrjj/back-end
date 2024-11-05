import mongoose, { Schema, Document } from "mongoose";

export interface IAnunciante {
    nomeVendedor: string;
    sobrenomeVendedor: string;
    cpfVendedor: string;
    estrelasVendedor: string;
    avaliacoesVendedor: string;
    dataCadastro: string;
    numeroVendas: string;
    tempoDespacho: string;
    vendasCanceladas: string;
}

export interface IProduct extends IAnunciante {
    nome: string;
    codigo: string;
    preco: string;
    garantia: string;
    parcelas: string;
    descricao: string;
    categoria: string;
    subcategoria: string;
    condicaoProduto: string;
    tipoProduto: string;
    cep: string;
    estado: string;
    municipio: string;
    bairro: string;
    created_at?: Date;
    updated_at?: Date;
    imagem: string;
}

const ProductSchema: Schema = new Schema({
    nome: { type: String },
    codigo: { type: String },
    preco: { type: String },
    garantia: { type: String },
    parcelas: { type: String },
    descricao: { type: String },
    nomeVendedor: { type: String },
    sobrenomeVendedor: { type: String },
    cpfVendedor: { type: String },
    estrelasVendedor: { type: String },
    avaliacoesVendedor: { type: String },
    dataCadastro: { type: String },
    numeroVendas: { type: String },
    tempoDespacho: { type: String },
    vendasCanceladas: { type: String },
    categoria: { type: String },
    subcategoria: { type: String },
    condicaoProduto: { type: String },
    cep: { type: String },
    estado: { type: String },
    municipio: { type: String },
    bairro: { type: String },
    imagem: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

interface IProductModel extends IProduct, Document {}

const Product = mongoose.model<IProductModel>("Product", ProductSchema);

export default Product;
