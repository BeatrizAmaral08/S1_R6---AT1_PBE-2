import { Router } from "express";
const routes = Router()
import categoriaRoutes from "./categoriaRoutes.js";
import clientesRoutes from "./clientesRoutes.js";
import produtoRoutes from "./produtoRoutes.js";
import pedidoRoutes from "./pedidoRoutes.js";

routes.use('/categorias', categoriaRoutes)
routes.use('/clientes', clientesRoutes)
routes.use('/produtos', produtoRoutes)
routes.use('/pedidos', pedidoRoutes)

export default routes;
