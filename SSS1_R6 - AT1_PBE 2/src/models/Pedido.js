export class Pedido {
    #id
    #idCliente
    #subTotal
    #status
    #dataCad

    constructor(pIdCliente, pSubTotal, pStatus, pDataCad = null, pId = null) {
        this.idCliente = pIdCliente
        this.subTotal = pSubTotal
        this.status = pStatus
        this.dataCad = pDataCad
        this.id = pId
    }

    get id() { 
        return this.#id 
    }
    get idCliente() { 
        return this.#idCliente 
    }
    get subTotal() { 
        return this.#subTotal 
    }
    get status() { 
        return this.#status 
    }
    get dataCad() { 
        return this.#dataCad 
    }

    set id(value) {
        this.#validarId(value)
        this.#id = value
    }

    set idCliente(value) {
        this.#validarIdCliente(value)
        this.#idCliente = value
    }

    set subTotal(value) {
        this.#validarSubTotal(value)
        this.#subTotal = value
    }

    set status(value) {
        this.#status = value
    }

    set dataCad(value) {
        this.#dataCad = value
    }

    #validarId(value) {
        if (value !== null && value <= 0) {
            throw new Error("ID inválido")
        }
    }

    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error("ID Cliente inválido")
        }
    }

    #validarSubTotal(value) {
        if (value < 0) {
            throw new Error("Subtotal inválido")
        }
    }

  
    static criar(dados) {
        return new Pedido(dados.idCliente, dados.subTotal, dados.status)
    }

    static editar(dados, id) {
        return new Pedido(dados.idCliente, dados.subTotal, dados.status, null, id)
    }
}