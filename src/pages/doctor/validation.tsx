import { FormData } from './app';

export const validateFields = (formData: FormData) => {
  let errors = {
    nomeCompleto: '',
    crm: '',
    especialidade: '',
    telefone: '',
    email: '',
  };

  if (!formData.nomeCompleto) {
    errors.nomeCompleto = 'Nome completo é obrigatório';
  }

  if (!formData.crm) {
    errors.crm = 'CRM é obrigatório';
  }

  if (!formData.especialidade) {
    errors.especialidade = 'Especialidade é obrigatória';
  }

  if (formData.telefone && formData.telefone.replace(/\D/g, '').length < 10) {
    errors.telefone = 'Telefone deve ter pelo menos 10 dígitos';
  }

  return errors;
};
