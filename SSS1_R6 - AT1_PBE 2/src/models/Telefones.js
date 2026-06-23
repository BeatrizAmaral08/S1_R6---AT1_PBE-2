export class Telefones {
    #telefone;
    #idTelefone;
    #idCliente;

    constructor(pTelefone, pIdCliente, pidTelefone) {
        this.telefone = pTelefone;
        this.#idCliente = pIdCliente;
        this.#idTelefone = pidTelefone;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(value) {
        this.#validarTelefone(String(value));
        this.#telefone = String(value);
    }

    get idCliente() {
        return this.#idCliente;
    }

    get idTelefone() {
        return this.#idTelefone;
    }

    #validarTelefone(value) {
        if (!value || value.trim().length < 11 || value.trim().length > 12) {
            throw new Error('O campo telefone é obrigatório e deve ter entre 11 e 12 caracteres');
        }
    }

    static criar(dados) {
        return new Telefones(dados.telefone, null, null);
    }

    static editar(dados, id) {
        return new Telefones(dados.telefone, null, id);
    }
}