import { connection } from "../configs/Database.js";

const pedidoRepository = {

    // 🔥 CRIAR PEDIDO COM ITENS + SUBTOTAL
    criar: async (pedido, itens) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlPedido = `
                INSERT INTO pedidos (IdCliente, subTotal, status)
                VALUES (?, ?, ?)
            `;
            const [resultPedido] = await conn.execute(sqlPedido, [
                pedido.idCliente,
                0,
                pedido.status
            ]);

            const idPedido = resultPedido.insertId;

            let subtotal = 0;

            for (const item of itens) {
                const totalItem = item.quantidade * item.valorItem;
                subtotal += totalItem;

                const sqlItem = `
                    INSERT INTO itens_pedidos 
                    (IdPedido, IdProduto, quantidade, valorItem)
                    VALUES (?, ?, ?, ?)
                `;

                await conn.execute(sqlItem, [
                    idPedido,
                    item.idProduto,
                    item.quantidade,
                    item.valorItem
                ]);
            }

            await conn.execute(`
                UPDATE pedidos SET subTotal = ?
                WHERE IdPedidos = ?
            `, [subtotal, idPedido]);

            await conn.commit();

            return { idPedido, subtotal };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    // ➕ ADICIONAR ITEM EM PEDIDO EXISTENTE
    adicionarItem: async (idPedido, item) => {
        await connection.execute(`
            INSERT INTO itens_pedidos
            (IdPedido, IdProduto, quantidade, valorItem)
            VALUES (?, ?, ?, ?)
        `, [idPedido, item.idProduto, item.quantidade, item.valorItem]);

        await pedidoRepository.atualizarSubtotal(idPedido);
    },

    // ✏️ EDITAR ITEM (QUANTIDADE)
    editarItem: async (item) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sql = `
                UPDATE itens_pedidos
                SET quantidade = ?
                WHERE IdItensPedidos = ?
            `;

            await conn.execute(sql, [
                item.quantidade,
                item.id
            ]);

            // 🔥 ESSA LINHA QUEBRAVA SE idPedido = undefined
            await conn.execute(`
                UPDATE pedidos 
                SET subTotal = (
                    SELECT SUM(valorItem * quantidade)
                    FROM itens_pedidos
                    WHERE idPedido = ?
                )
                WHERE IdPedidos = ?
            `, [item.idPedido, item.idPedido]);

            await conn.commit();
            return { message: "Item atualizado com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    // ❌ DELETAR ITEM
    deletarItem: async (idItem) => {
        const [item] = await connection.execute(`
            SELECT IdPedido FROM itens_pedidos
            WHERE IdItensPedidos = ?
        `, [idItem]);

        await connection.execute(`
            DELETE FROM itens_pedidos
            WHERE IdItensPedidos = ?
        `, [idItem]);

        await pedidoRepository.atualizarSubtotal(item[0].IdPedido);
    },

    // 🔥 FUNÇÃO CENTRAL (RECALCULA SUBTOTAL)
    atualizarSubtotal: async (idPedido) => {
        const [result] = await connection.execute(`
            SELECT SUM(quantidade * valorItem) AS total
            FROM itens_pedidos
            WHERE IdPedido = ?
        `, [idPedido]);

        const total = result[0].total || 0;

        await connection.execute(`
            UPDATE pedidos
            SET subTotal = ?
            WHERE IdPedidos = ?
        `, [total, idPedido]);
    },

    // 🔄 ALTERAR STATUS DO PEDIDO
    atualizarStatus: async (id, status) => {
        const sql = `
            UPDATE pedidos
            SET status = ?
            WHERE IdPedidos = ?
        `;
        const [rows] = await connection.execute(sql, [status, id]);
        return rows;
    },

    selecionarTodos: async () => {
        const sql = `
            SELECT 
                p.IdPedidos,
                p.IdCliente,
                p.subTotal,
                p.status,
                p.dataCad,
                i.IdItensPedidos,
                i.IdProduto,
                i.quantidade,
                i.valorItem
            FROM pedidos p
            LEFT JOIN itens_pedidos i 
                ON p.IdPedidos = i.IdPedido
            ORDER BY p.IdPedidos;
        `;

        const [rows] = await connection.execute(sql);
        return rows;
    },

};

export default pedidoRepository;