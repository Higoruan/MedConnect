import { FormData } from './add';

export const validateFields = (formData: FormData) => {
    let errors = {
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
       
    };

    if (!formData.nome) {
        errors.nome = 'Nome completo é obrigatório';
    }

   if (!formData.cpf) {
        errors.cpf = 'CPF é obrigatória';
    }

    if (formData.telefone && formData.telefone.replace(/\D/g, '').length < 10) {
        errors.telefone = 'Telefone deve ter pelo menos 10 dígitos';
    }
     return errors;
};

export const validateCPF = (cpf: string) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return regex.test(cpf);
};

export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
