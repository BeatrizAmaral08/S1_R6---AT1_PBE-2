import { Produtos } from "../models/Produtos.js";
import produtoRepository from "../repositories/produtosRepository.js";

const produtosController = {
    criar: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Imagem não foi enviada' });
            }
            const { nome, valor, idCategoria } = req.body;
            if (!nome || !valor || !idCategoria) {
                return res.status(400).json({ message: 'Campos obrigatórios faltando' });
            }
            const caminhoImg = `/uploads/imagens/${req.file.filename}`;
            const produto = Produtos.criar({
                nome,
                valor,
                caminhoImg,
                id: idCategoria
            });

            const result = await produtoRepository.criar(produto);

            res.status(201).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    editar: async (req, res) => {
        try {
            const idProduto = req.params.id;
            const { nome, valor, idCategoria } = req.body;
            const caminhoImg = req.file
                ? `/uploads/imagens/${req.file.filename}`
                : null;

            if (!nome || !valor || !idCategoria) {
                return res.status(400).json({
                    message: 'Campos obrigatórios faltando'
                });
            }
            const produto = Produtos.alterar(
                {
                    nome,
                    valor,
                    caminhoImg,
                    id: idCategoria
                },
                idProduto
            );
            const result = await produtoRepository.editar(produto);

            return res.status(200).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Erro ao atualizar produto',
                errorMessage: error.message
            });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionarTodos: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.selecionarTodos();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionarUm: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.selecionarUm(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
};

export default produtosController;