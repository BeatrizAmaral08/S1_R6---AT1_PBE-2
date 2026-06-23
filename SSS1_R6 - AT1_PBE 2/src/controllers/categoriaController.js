import { Categoria } from "../models/Categoria.js";
import categoriaRepository from "../repositories/categoriaRepository.js";

const categoriaController = {
    criar: async (req, res) => {
        try {
            const { nome, descricao } = req.body;
            const categoria = Categoria.criar({ nome, descricao });
            const result = await categoriaRepository.criar(categoria);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, descricao } = req.body;

            const categoria = Categoria.alterar({ nome, descricao }, id);
            const result = await categoriaRepository.editar(categoria);

            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro', errorMessage: error.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await categoriaRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionarTodos: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await categoriaRepository.selecionarTodos();
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

            const result = await categoriaRepository.selecionarUm(id);
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

export default categoriaController;