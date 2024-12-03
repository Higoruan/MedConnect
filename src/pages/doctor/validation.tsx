import { FormData } from './app';

export const validateFields = (formData: FormData) => {
  let errors = {
    nomeCompleto: '',
    crm: '',
    especialidade: '',
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

  return errors;
};
