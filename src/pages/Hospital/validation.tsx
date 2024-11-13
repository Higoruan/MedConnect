import { FormData } from './app';

export const validateFields = (formData: FormData) => {
    let errors = {
        nome: '',
        endereco: '',
        cnpj: '',
        telefone: '',
        email: '',
        senha: ''
    };

    if (!formData.nome) {
        errors.nome = 'Nome completo é obrigatório';
    }

    if (!formData.endereco) {
        errors.endereco = 'Endereço é obrigatório';
    }

    if (!formData.cnpj) {
        errors.cnpj = 'CNPJ é obrigatória';
    }

    if (formData.telefone && formData.telefone.replace(/\D/g, '').length < 10) {
        errors.telefone = 'Telefone deve ter pelo menos 10 dígitos';
    }

    if (!formData.senha) {
        errors.senha = 'Senha é obrigatória'
    }

    if (formData.senha && formData.senha.length < 6) {
        errors.senha = 'Senha não pode ser menor que 6 caracteres';
    }

    return errors;
};
