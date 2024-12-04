import { FormData } from './add';

export const validateFields = (formData: FormData) => {
    let errors = {
        nome: '',
        cod: ''
    };

    if (!formData.nome) {
        errors.nome = 'Nome completo é obrigatório';
    }

    if (!formData.cod) {
        errors.cod = 'Endereço é obrigatório';
    }
    return errors;
};
