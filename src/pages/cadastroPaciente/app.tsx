import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Função para validar CPF
const validateCPF = (cpf: string) => {
  const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return regex.test(cpf);
};

// Função para validar email
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const PatientForm: React.FC = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigation = useNavigation();

  const handleSubmit = () => {
    let validationErrors: { [key: string]: string } = {};

    // Validação dos campos obrigatórios
    if (!name) validationErrors.name = 'Nome é obrigatório';
    if (!cpf) validationErrors.cpf = 'CPF é obrigatório';
    if (cpf && !validateCPF(cpf)) validationErrors.cpf = 'CPF inválido. Use o formato 000.000.000-00';
    if (!birthDate) validationErrors.birthDate = 'Data de nascimento é obrigatória';
    if (email && !validateEmail(email)) validationErrors.email = 'E-mail inválido';

    setErrors(validationErrors);

    // Se não houver erros, enviar os dados
    if (Object.keys(validationErrors).length === 0) {
      console.log({
        name,
        cpf,
        birthDate,
        email,
        phone,
      });
      Alert.alert('Paciente cadastrado com sucesso!');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Cadastro de Paciente</Text>

      {/* Nome */}
      <View style={styles.field}>
        <Text>Nome*</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      </View>

      {/* CPF */}
      <View style={styles.field}>
        <Text>CPF*</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          placeholder="000.000.000-00"
        />
        {errors.cpf && <Text style={styles.error}>{errors.cpf}</Text>}
      </View>

      {/* Data de Nascimento */}
      <View style={styles.field}>
        <Text>Data de Nascimento*</Text>
        <TextInput
          style={styles.input}
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="YYYY-MM-DD"
        />
        {errors.birthDate && <Text style={styles.error}>{errors.birthDate}</Text>}
      </View>

      {/* E-mail */}
      <View style={styles.field}>
        <Text>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>

      {/* Telefone */}
      <View style={styles.field}>
        <Text>Telefone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Botão Cadastrar */}
      <Button title="Cadastrar" onPress={handleSubmit} color="#28a745" />

      {/* Botão Voltar */}
      <Button title="Voltar" onPress={() => navigation.goBack()} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    margin: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default PatientForm;
