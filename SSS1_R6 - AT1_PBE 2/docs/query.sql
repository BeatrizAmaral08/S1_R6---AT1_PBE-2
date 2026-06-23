USE loja_i2hsb_3103; //query para montar em casa

CREATE TABLE IF NOT EXISTS produtos(
idProduto INT PRIMARY KEY AUTO_INCREMENT,
idCategoria INT NOT NULL,
nomeProduto VARCHAR(100) NOT NULL,
valorProduto DECIMAL (10,2) NOT NULL,
vinculoImagem VARCHAR (250) NOT NULL,
dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_produtos_categorias
FOREIGN KEY (idCategoria)
REFERENCES categorias (id)
);

CREATE TABLE IF NOT EXISTS clientes (
    idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cpf CHAR(11) NOT NULL,
    dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telefones (
    idTelefone INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    telefone CHAR(12) NOT NULL,
    CONSTRAINT fk_telefones_clientes
    FOREIGN KEY (idCliente)
    REFERENCES clientes (idCliente)
);

CREATE TABLE IF NOT EXISTS enderecos (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    uf VARCHAR(2) NOT NULL,
    cep CHAR(8) NOT NULL,
    logradouro VARCHAR(150) NOT NULL,
    numero CHAR(6) NOT NULL,
    complemento VARCHAR(150) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    bairro VARCHAR(50),
    CONSTRAINT fk_enderecos_clientes
    FOREIGN KEY (idCliente)
    REFERENCES clientes (idCliente)
);

SELECT * 
FROM clientes AS c
INNER JOIN enderecos AS e
    ON c.idCliente = e.idCliente
INNER JOIN telefones AS t
    ON c.idCliente = t.idCliente;

SELECT * from clientes;
SELECT * from telefones;
SELECT * from enderecos;