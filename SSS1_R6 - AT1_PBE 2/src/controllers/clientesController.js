import clienteRepository from "../repositories/clientesRepository.js";
import axios from "axios";
import { Clientes } from "../models/Clientes.js";
import { Enderecos } from "../models/Enderecos.js";
import { Telefones } from "../models/Telefones.js";
import { validarCPF } from "../utils/validarCpf.js";
import { limparNumero } from "../utils/limparNumero.js";

const consultaCep = async (cep) => {
    const cepRegex = /^[0-9]{8}$/;
    if (!cepRegex.test(cep)) {
        throw new Error('CEP inválido');
    }
    const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (!respApi.data || respApi.data.erro) {
        throw new Error('CEP não encontrado');
    }
    return {
        uf: respApi.data.uf,
        logradouro: respApi.data.logradouro,
        cidade: respApi.data.localidade,
        bairro: respApi.data.bairro
    };
};

const clientesController = {
    criar: async (req, res) => {
        console.log("teste123");

        try {
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;
            if (!validarCPF(cpf))
                return res.status(400).json({ message: "CPF inválido" });
            limparNumero(numero);
            const enderecoCep = await consultaCep(cep);
            const { uf, logradouro, cidade, bairro } = enderecoCep;

            const cliente = Clientes.criar({ nome, cpf });
            const telefoneObj = Telefones.criar({ telefone });
            const enderecoObj = Enderecos.criar({ uf, logradouro, cidade, bairro, numero, cep, complemento });
            const result = await clienteRepository.criar(cliente, telefoneObj, enderecoObj);

            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    editar: async (req, res) => {
        try {
            console.log('id: ', req.params.id);

            const idCliente = req.params.id;
            const { idEndereco, idTelefone } = req.query;
            const { nome, cpf, telefone, cep, numero, complemento, } = req.body;

            if (!validarCPF(cpf))
                return res.status(400).json({ message: "CPF inválido" });
            limparNumero(numero);

            const enderecoCep = await consultaCep(cep);
            const { uf, logradouro, cidade, bairro } = enderecoCep;
            const cliente = Clientes.editar({ nome, cpf }, idCliente);
            const telefoneObj = Telefones.editar({ telefone }, idTelefone);
            const enderecoObj = Enderecos.editar({ uf, logradouro, cidade, bairro, numero, cep, complemento }, idEndereco);
            const result = await clienteRepository.editar(cliente, telefoneObj, enderecoObj);

            return res.status(200).json(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    deletar: async (req, res) => {
        try {
            console.log('id: ', req.params.id);
            const idCliente = req.params.id;
            const { idEndereco, idTelefone } = req.query;

            const result = await clienteRepository.deletar({ idCliente }, { idTelefone }, { idEndereco });
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    selecionarTodos: async (req, res) => {
        try {
            const result = await clienteRepository.selecionarTodos();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
}
export default clientesController;

