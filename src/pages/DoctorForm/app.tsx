// src/MedicoForm.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import FormInput from './FormImput/FormImput';
import { validateFields } from './validations/DoctorForm.validations';
import { styles } from './style';


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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Campos do Formulário */}
      <FormInput
        value={formData.nomeCompleto}
        onChangeText={(value) => handleInputChange('nomeCompleto', value)}
        placeholder="Digite seu nome completo"
        error={errors.nomeCompleto}
      />

      <TextInputMask
        type={'custom'}
        options={{
          mask: '999999',
        }}
        style={[styles.input, errors.crm ? styles.inputError : undefined]}
        placeholder="Digite seu CRM"
        value={formData.crm}
        onChangeText={(value) => handleInputChange('crm', value)}
      />
      {errors.crm && <Text style={styles.error}>{errors.crm}</Text>}

      <FormInput
        value={formData.especialidade}
        onChangeText={(value) => handleInputChange('especialidade', value)}
        placeholder="Digite sua especialidade"
        error={errors.especialidade}
      />

      <TextInputMask
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        style={[styles.input, errors.telefone ? styles.inputError : undefined]}
        placeholder="Digite seu telefone"
        value={formData.telefone}
        onChangeText={(value) => handleInputChange('telefone', value)}
      />
      {errors.telefone && <Text style={styles.error}>{errors.telefone}</Text>}

      <FormInput
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        placeholder="Digite seu e-mail"
        error={errors.email}
      />

      {/* Botão Cadastrar */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={Object.values(errors).some((error) => error !== '')}
      >
        <Text style={styles.submitButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Snackbar para feedback */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}
