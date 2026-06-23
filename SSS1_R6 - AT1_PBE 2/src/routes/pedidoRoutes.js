import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoController.criar);
pedidoRoutes.post('/item/:id', pedidoController.adicionarItem);
pedidoRoutes.put('/item/:id', pedidoController.editarItem);
pedidoRoutes.delete('/item/:id', pedidoController.deletarItem);
pedidoRoutes.put('/:id/status', pedidoController.atualizarStatus);
pedidoRoutes.get('/', pedidoController.selecionarTodos);

export default pedidoRoutes;