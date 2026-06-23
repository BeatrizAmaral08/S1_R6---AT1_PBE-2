import { connection } from "../configs/Database.js";

const produtoRepository = {

    criar: async (produto) => {
        const sql = `
        INSERT INTO produtos (idCategoria, nomeProduto, valorProduto, vinculoImagem)
        VALUES (?,?,?,?)
        `;
        const values = [
            produto.id,
            produto.nome,
            produto.valor,
            produto.caminhoImg
        ];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    editar: async (produto) => {
        const sql = `
        UPDATE produtos 
        SET nomeProduto=?, valorProduto=?, idCategoria=?, vinculoImagem=? 
        WHERE idProduto=?
        `;
        const values = [
            produto.nome,
            produto.valor,
            produto.id,
            produto.caminhoImg,
            produto.idProduto
        ];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE idProduto=?';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    },

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    selecionarUm: async (id) => {
        const sql = 'SELECT * FROM produtos WHERE idProduto=?';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    }
};

export default produtoRepository;