import { statusPed } from "../enums/statusPedido.js";
import { ItensPedido } from "../models/ItensPedido.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";

const pedidoController = {

    criar: async (req, res) => {
        try {
            const { idCliente, itens } = req.body;
            const itensPedido = itens.map(item =>
                ItensPedido.criar({
                    idProduto: item.idProduto,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );

            const subTotal = ItensPedido.calculadoraSubTotalItens(itensPedido);
            const pedido = Pedido.criar({
                idCliente,
                subTotal,
                status: statusPed.ABERTO
            });

            const result = await pedidoRepository.criar(pedido, itensPedido);
            return res.status(201).json({
                message: "Pedido criado com sucesso",
                data: result
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Erro ao criar pedido",
                error: error.message
            });
        }
    },

    adicionarItem: async (req, res) => {
        try {
            const { id } = req.params;
            const item = ItensPedido.criar(req.body);

            await pedidoRepository.adicionarItem(id, item);
            return res.json({
                message: "Item adicionado com sucesso"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Erro ao adicionar item",
                error: error.message
            });
        }
    },

   editarItem: async (req, res) => {
        try {
            const id = req.params.id;
            const { quantidade, idPedido } = req.body;

            if (!id || !quantidade || !idPedido) {
                return res.status(400).json({
                    message: "id, quantidade e idPedido são obrigatórios",
                    debug: { id, quantidade, idPedido }
                });
            }
            const result = await pedidoRepository.editarItem({
                id,
                quantidade,
                idPedido
            });

            return res.status(200).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Erro ao editar item",
                error: error.message
            });
        }
    },

    deletarItem: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: "id do item é obrigatório"
                });
            }

            await pedidoRepository.deletarItem(id);

            return res.json({
                message: "Item removido com sucesso"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Erro ao deletar item",
                error: error.message
            });
        }
    },

    atualizarStatus: async (req, res) => {
        try {
            const id = req.params.id;
            const { status } = req.body;

            if (!id || !status) {
                return res.status(400).json({
                    message: "id e status são obrigatórios",
                    debug: { id, status }
                });
            }
            const result = await pedidoRepository.atualizarStatus(id, status);
            return res.status(200).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Erro ao atualizar status",
                error: error.message
            });
        }
    },

    selecionarTodos: async (req, res) => {
        try {
            const result = await pedidoRepository.selecionarTodos();
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Erro ao listar pedidos",
                error: error.message
            });
        }
    },

};

export default pedidoController;