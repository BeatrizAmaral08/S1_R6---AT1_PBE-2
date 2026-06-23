export class Clientes {
    #nome;
    #cpf;
    #dataCad;
    #idCliente;

    constructor(pNome, pCpf, pIdCliente) {
        this.nome = pNome;
        this.cpf = pCpf;
        this.#idCliente = pIdCliente;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#cpf = value;
    }

    get idCliente() {
        return this.#idCliente;
    }

    set idCliente(value) {
        this.#idCliente = idCliente;
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }


    static criar(dados) {
        return new Clientes(dados.nome, dados.cpf,);
    }

    static editar(dados, idCliente) {
        console.log('teste001: ', dados, idCliente);
        
        return new Clientes(dados.nome, dados.cpf, idCliente);
    }
}