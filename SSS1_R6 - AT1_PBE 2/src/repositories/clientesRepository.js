import { connection } from "../configs/Database.js";

const clienteRepository = {
    criar: async (clientes, telefones, enderecos) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlClientes = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?);';
            const valuesClientes = [clientes.nome, clientes.cpf];
            const [rowsClientes] = await conn.execute(sqlClientes, valuesClientes);

            const sqlTelefones = `INSERT INTO telefones (idCliente, telefone) VALUES (?, ?);`;
            const valuesTelefones = [rowsClientes.insertId, telefones.telefone];
            const [rowsTelefones] = await conn.execute(sqlTelefones, valuesTelefones);

            const sqlEnderecos = `INSERT INTO enderecos (idCliente, uf, logradouro, cidade, bairro, numero, cep, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
            const valuesEnderecos = [
                rowsClientes.insertId,
                enderecos.uf,
                enderecos.logradouro,
                enderecos.cidade,
                enderecos.bairro,
                enderecos.numero,
                enderecos.cep,
                enderecos.complemento
            ];
            const [rowsEnderecos] = await conn.execute(sqlEnderecos, valuesEnderecos);

            await conn.commit();
            return { rowsClientes, rowsTelefones, rowsEnderecos };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editar: async (clientes, telefones, enderecos) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlClientes = 'UPDATE clientes SET nome = ?, cpf = ? WHERE Id = ?;';
            const valuesClientes = [clientes.nome, clientes.cpf, clientes.idCliente];
            const [rowsClientes] = await conn.execute(sqlClientes, valuesClientes);

            const sqlTelefones = 'UPDATE telefones SET telefone = ? WHERE idTelefone = ?;';
            const valuesTelefones = [telefones.telefone, telefones.idTelefone];
            const [rowsTelefones] = await conn.execute(sqlTelefones, valuesTelefones);

            const sqlEnderecos = `
                UPDATE enderecos 
                SET uf = ?, logradouro = ?, cidade = ?, bairro = ?, numero = ?, cep = ?, complemento = ? 
                WHERE idEndereco = ?;
            `;
            const valuesEnderecos = [
                enderecos.uf,
                enderecos.logradouro,
                enderecos.cidade,
                enderecos.bairro,
                enderecos.numero,
                enderecos.cep,
                enderecos.complemento,
                enderecos.idEndereco
            ];
            const [rowsEnderecos] = await conn.execute(sqlEnderecos, valuesEnderecos);

            await conn.commit();
            return { rowsClientes, rowsTelefones, rowsEnderecos };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (clientes, telefones, enderecos) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlTelefones = 'DELETE FROM telefones WHERE idTelefone = ?;';
            const [rowsTelefones] = await conn.execute(sqlTelefones, [telefones.idTelefone]);

            const sqlEnderecos = 'DELETE FROM enderecos WHERE idEndereco = ?;';
            const [rowsEnderecos] = await conn.execute(sqlEnderecos, [enderecos.idEndereco]);

            const sqlClientes = 'DELETE FROM clientes WHERE Id = ?;';
            const [rowsClientes] = await conn.execute(sqlClientes, [clientes.idCliente]);

            await conn.commit();
            return { rowsClientes, rowsTelefones, rowsEnderecos };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionarTodos: async () => {
        const sql = `
            SELECT * 
            FROM clientes AS c
            INNER JOIN enderecos AS e ON c.Id = e.IdCliente
            INNER JOIN telefones AS t ON c.Id = t.IdCliente
        `;
        const [rows] = await connection.execute(sql);
        return rows;
    },
};

export default clienteRepository;