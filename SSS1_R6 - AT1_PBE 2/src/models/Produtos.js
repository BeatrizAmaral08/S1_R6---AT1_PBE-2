export class Produtos {
    #id;
    #nome;
    #valor;
    #caminhoImg;
    #idProduto;
    #dataCad;

    constructor(pNome, pId, pValor, pCaminhoImg, pIdProduto) {
        this.nome = pNome;
        this.id = pId;
        this.valor = pValor;
        this.caminhoImg = pCaminhoImg;
        this.#idProduto = pIdProduto;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminhoImg() {
        return this.#caminhoImg;
    }
    set caminhoImg(value) {
        this.#validarCaminhoImg(value);
        this.#caminhoImg = value;
    }

    get idProduto() {
        return this.#idProduto;
    }

    get dataCad() {
        return this.#dataCad;
    }

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o id informado');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }

    #validarValor(value) {
        if (value === undefined) {
            throw new Error('O campo valor é obrigatório e deve ser um número positivo');
        }
    }

    #validarCaminhoImg(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 250) {
            throw new Error('O campo caminhoImg é obrigatório e deve ter entre 3 e 250 caracteres');
        }
    }

    static criar(dados) {
        return new Produtos(dados.nome, dados.id, dados.valor, dados.caminhoImg, null);
    }

    static alterar(dados, id) {
    return new Produtos(dados.nome, dados.id, dados.valor, dados.caminhoImg, id);
}
}