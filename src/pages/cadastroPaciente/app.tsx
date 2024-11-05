import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { validateCPF, validateEmail } from './validation';
import { Form, Title, Field, Input, ErrorText } from './style';

const PatientForm: React.FC = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    let validationErrors: { [key: string]: string } = {};

    // Validação dos campos obrigatórios
    if (!name) validationErrors.name = 'Nome é obrigatório';
    if (!cpf) validationErrors.cpf = 'CPF é obrigatório';
    if (cpf && !validateCPF(cpf)) validationErrors.cpf = 'CPF inválido. Use o formato 000.000.000-00';
    if (!birthDate) validationErrors.birthDate = 'Data de nascimento é obrigatória';
    if (email && !validateEmail(email)) validationErrors.email = 'E-mail inválido';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log({ name, cpf, birthDate, email, phone });
      Alert.alert('Paciente cadastrado com sucesso!');
    }
  };

  return (
    <Form>
      <Title>Cadastro de Paciente</Title>

      {/* Nome */}
      <Field>
        <Input
          placeholder="Nome*"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </Field>

      {/* CPF */}
      <Field>
        <Input
          placeholder="CPF*"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        {errors.cpf && <ErrorText>{errors.cpf}</ErrorText>}
      </Field>

      {/* Data de Nascimento */}
      <Field>
        <Input
          placeholder="Data de Nascimento*"
          value={birthDate}
          onChangeText={setBirthDate}
          keyboardType="numeric"
        />
        {errors.birthDate && <ErrorText>{errors.birthDate}</ErrorText>}
      </Field>

      {/* E-mail */}
      <Field>
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </Field>

      {/* Telefone */}
      <Field>
        <Input
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </Field>

      {/* Botão Cadastrar */}
      <Button title="Cadastrar" onPress={handleSubmit} color="#28a745" />
    </Form>
  );
};

export default PatientForm;
