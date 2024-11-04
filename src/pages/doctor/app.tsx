import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validateFields } from './validation';
import { Container, Form, Input, Button, ButtonText, ErrorMessage } from './style'; // Ajuste o caminho se necessário

export interface FormData {
  nomeCompleto: string;
  crm: string;
  especialidade: string;
  telefone: string;
  email: string;
}

export default function MedicoForm() {
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: '',
    crm: '',
    especialidade: '',
    telefone: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    nomeCompleto: '',
    crm: '',
    especialidade: '',
    telefone: '',
    email: '',
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigation = useNavigation();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateFields(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => error === '')) {
      console.log('Dados do formulário:', formData);
      setSnackbarMessage('Cadastro realizado com sucesso!');
      setSnackbarVisible(true);
    }
  };

  return (
    <Container>
      <h1>Cadastrar</h1>
      <Form>
        <Input
          placeholder="Digite seu nome completo"
          value={formData.nomeCompleto}
          onChangeText={(value) => handleInputChange('nomeCompleto', value)}
        />
        {errors.nomeCompleto && <ErrorMessage>{errors.nomeCompleto}</ErrorMessage>}

        <Input
          placeholder="Digite seu CRM"
          value={formData.crm}
          onChangeText={(value) => handleInputChange('crm', value)}
        />
        {errors.crm && <ErrorMessage>{errors.crm}</ErrorMessage>}

        <Input
          placeholder="Digite sua especialidade"
          value={formData.especialidade}
          onChangeText={(value) => handleInputChange('especialidade', value)}
        />
        {errors.especialidade && <ErrorMessage>{errors.especialidade}</ErrorMessage>}

        <Input
          placeholder="Digite seu telefone"
          value={formData.telefone}
          onChangeText={(value) => handleInputChange('telefone', value)}
        />
        {errors.telefone && <ErrorMessage>{errors.telefone}</ErrorMessage>}

        <Input
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Button onPress={handleSubmit}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>

        {snackbarVisible && (
          <ErrorMessage>{snackbarMessage}</ErrorMessage>
        )}
      </Form>
    </Container>
  );
}
