export class ItensPedido {
    #id
    #idPedido
    #idProduto
    #quantidade
    #valorItem

    constructor(pIdProduto, pQuantidade, pValorItem, pIdPedido = null, pId = null) {
        this.idProduto = pIdProduto
        this.quantidade = pQuantidade
        this.valorItem = pValorItem
        this.idPedido = pIdPedido
        this.id = pId
    }

    // GETTERS
    get id() { 
        return this.#id 
    }
    get idPedido() { 
        return this.#idPedido 
    }
    get idProduto() { 
        return this.#idProduto 
    }
    get quantidade() { 
        return this.#quantidade 
    }
    get valorItem() { 
        return this.#valorItem 
    }

    // SETTERS 
    set id(value) {
        this.#validarId(value)
        this.#id = value
    }

    set idPedido(value) {
        this.#validarIdPedido(value)
        this.#idPedido = value
    }

    set idProduto(value) {
        this.#validarIdProduto(value)
        this.#idProduto = value
    }

    set quantidade(value) {
        this.#validarQuantidade(value)
        this.#quantidade = value
    }

    set valorItem(value) {
        this.#validarValorItem(value)
        this.#valorItem = value
    }


    #validarId(value) {
        if (value !== null && value <= 0) {
            throw new Error("ID inválido")
        }
    }

    #validarIdProduto(value) {
        if (!value || value <= 0) {
            throw new Error("ID Produto inválido")
        }
    }

    #validarIdPedido(value) {
        if (value !== null && value <= 0) {
            throw new Error("ID Pedido inválido")
        }
    }

    #validarQuantidade(value) {
        if (!value || value <= 0) {
            throw new Error("Quantidade inválida")
        }
    }

    #validarValorItem(value) {
        if (!value || value <= 0) {
            throw new Error("Valor do item inválido")
        }
    }

    static calculadoraSubTotalItens(itens) {
        return itens.reduce(
            (total, item) => total + (item.valorItem * item.quantidade),
            0
        )
    }

    static criar(dados) {
        return new ItensPedido(
            dados.idProduto,
            dados.quantidade,
            dados.valorItem
        )
    }

    static editar(dados, id) {
        return new ItensPedido(
            dados.idProduto,
            dados.quantidade,
            dados.valorItem,
            dados.idPedido,
            id
        )
    }
}