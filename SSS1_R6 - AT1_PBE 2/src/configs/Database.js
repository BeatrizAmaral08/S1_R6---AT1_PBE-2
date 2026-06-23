 import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


// Singleton para a conexão com o banco de dados
class Database {
    static #instance = null;
    #pool = null;


    #createPool() {
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }


    static getInstance() {
        if (!Database.#instance) {
            Database.#instance = new Database();
            Database.#instance.#createPool();
        }
        return Database.#instance;
    }


    getPool() {
        return this.#pool;
    }
}


export const connection = Database.getInstance().getPool();


export async function initializeDatabase() {
    console.log("Inicializando o banco de dados e tabelas...");

    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false }
        });

        const dbName = process.env.DB_DATABASE || 'deploy';

        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);

        // Categorias
        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(45) NOT NULL,
                descricao VARCHAR(100),
                dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Clientes
        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS clientes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(100) NOT NULL,
                cpf VARCHAR(12) NOT NULL UNIQUE,
                dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Produtos
        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                idProduto INT PRIMARY KEY AUTO_INCREMENT,
                nomeProduto VARCHAR(100) NOT NULL,
                valorProduto DECIMAL(18,2) NOT NULL,
                idCategoria INT NOT NULL,
                vinculoImagem VARCHAR(255),

                CONSTRAINT fk_produto_categoria
                    FOREIGN KEY (idCategoria)
                    REFERENCES categorias(id)
            );
        `);

        // Pedidos
        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                idPedidos INT PRIMARY KEY AUTO_INCREMENT,
                idCliente INT NOT NULL,
                subTotal DECIMAL(18,2) NOT NULL,
                status ENUM('Aberto','Finalizado','Pendente') NOT NULL,
                dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT fk_pedido_cliente
                    FOREIGN KEY (idCliente)
                    REFERENCES clientes(id)
            );
        `);

        // Telefones
        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS telefones (
                idTelefone INT PRIMARY KEY AUTO_INCREMENT,
                telefone VARCHAR(20) NOT NULL,
                idCliente INT NOT NULL,
                dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT fk_telefone_cliente
                    FOREIGN KEY (idCliente)
                    REFERENCES clientes(id)
            );
        `);

        // Endereços
        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS enderecos (
                idEndereco INT PRIMARY KEY AUTO_INCREMENT,
                cep VARCHAR(8) NOT NULL,
                uf VARCHAR(2) NOT NULL,
                cidade VARCHAR(100) NOT NULL,
                bairro VARCHAR(100) NOT NULL,
                logradouro VARCHAR(150) NOT NULL,
                numero VARCHAR(10) NOT NULL,
                complemento VARCHAR(100),
                idCliente INT NOT NULL,
                dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT fk_endereco_cliente
                    FOREIGN KEY (idCliente)
                    REFERENCES clientes(id)
            );
        `);

        // Itens do Pedido
        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS itens_pedidos (
                idItensPedidos INT PRIMARY KEY AUTO_INCREMENT,
                idPedido INT NOT NULL,
                idProduto INT NOT NULL,
                quantidade DECIMAL(18,2) NOT NULL,
                valorItem DECIMAL(18,2) NOT NULL,

                CONSTRAINT fk_item_pedido
                    FOREIGN KEY (idPedido)
                    REFERENCES pedidos(idPedidos),

                CONSTRAINT fk_item_produto
                    FOREIGN KEY (idProduto)
                    REFERENCES produtos(idProduto)
            );
        `);

        await tempConnection.end();

        console.log("Banco de dados e tabelas verificados/criados com sucesso.");

    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}