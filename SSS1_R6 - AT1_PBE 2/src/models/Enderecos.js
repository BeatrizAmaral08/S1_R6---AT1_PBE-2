export class Enderecos {
    #idEndereco;
    #uf;
    #cep;
    #logradouro;
    #numero;
    #complemento;
    #cidade;
    #bairro;
    #idCliente;

    constructor(pIdEndereco, pUf, pCep, pLogradouro, pNumero, pComplemento, pCidade, pBairro, pIdCliente
    ) {
        this.#idEndereco = pIdEndereco;
        this.uf = pUf;
        this.cep = pCep;
        this.logradouro = pLogradouro;
        this.numero = pNumero;
        this.complemento = pComplemento;
        this.cidade = pCidade;
        this.bairro = pBairro;
        this.#idCliente = pIdCliente;
    }

    set uf(value) {
        this.#uf = value;
    }

    set cep(value) {
        this.#cep = value;
    }

    set logradouro(value) {
        this.#logradouro = value;
    }

    set numero(value) {
        this.#validarNumero(value);
        this.#numero = value;
    }

    set complemento(value) {
        this.#complemento = value;
    }

    set cidade(value) {
        this.#cidade = value;
    }

    set bairro(value) {
        this.#bairro = value;
    }

    get idEndereco() {
        return this.#idEndereco;
    }

    get uf() {
        return this.#uf;
    }

    get cep() {
        return this.#cep;
    }

    get logradouro() {
        return this.#logradouro;
    }

    get numero() {
        return this.#numero;
    }

    get complemento() {
        return this.#complemento;
    }

    get cidade() {
        return this.#cidade;
    }

    get bairro() {
        return this.#bairro;
    }

    get idCliente() {
        return this.#idCliente;
    }


    #validarNumero(value) {
        if (!value || value.toString().trim().length < 1 || value.toString().trim().length > 8) {
            throw new Error('O número é obrigatório e deve ter entre 1 e 8 caracteres');
        }
    }

    static criar(dados) {
        return new Enderecos(null, dados.uf, dados.cep, dados.logradouro, dados.numero, dados.complemento, dados.cidade,dados.bairro,null
        );
    }

    static editar(dados, idEndereco, idCliente) {
        return new Enderecos(idEndereco, dados.uf, dados.cep, dados.logradouro, dados.numero, dados.complemento, dados.cidade, dados.bairro, idCliente
        );
    }
}