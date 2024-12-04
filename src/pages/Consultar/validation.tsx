import { FormData } from './add';

export const validateFields = (formData: FormData) => {
    let errors = {
        data: '',
        Medico_id: '',
        Paciente_id: '',
        Cids_id: '',
        descricao: ''
    };

    if (!formData.data) {
        errors.data = 'data é obrigatório';
    }

    if (!formData.Medico_id) {
        errors.Medico_id = 'Médico é obrigatório';
    }

    if (!formData.Medico_id) {
        errors.Medico_id = 'Médico é obrigatório';
    }

    if (!formData.Cids_id) {
        errors.Cids_id = 'Cid é obrigatório';
    }

    return errors;
};
