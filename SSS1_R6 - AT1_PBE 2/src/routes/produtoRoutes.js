import { Router } from "express";
import produtosController from "../controllers/produtosController.js";
import uploadImage from "../middlewares/uploadImage.middleware.js";

const produtoRoutes = Router();

produtoRoutes.post('/', uploadImage, produtosController.criar);
produtoRoutes.put('/:id', uploadImage, produtosController.editar);
produtoRoutes.delete('/:id', produtosController.deletar)
produtoRoutes.get('/', produtosController.selecionarTodos);
produtoRoutes.get('/:id', produtosController.selecionarUm);

export default produtoRoutes;