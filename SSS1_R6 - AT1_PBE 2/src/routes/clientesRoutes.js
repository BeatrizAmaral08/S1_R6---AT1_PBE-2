import { Router } from "express";
import clientesController from "../controllers/clientesController.js";


const clientesRoutes = Router();

clientesRoutes.post('/',clientesController.criar);
clientesRoutes.put('/:id', clientesController.editar);
clientesRoutes.delete('/:id', clientesController.deletar);
clientesRoutes.get('/', clientesController.selecionarTodos);

export default clientesRoutes;