import React, { useEffect, useState } from 'react';
import { Button, Alert, StyleSheet } from 'react-native';
import { validateFields } from './validation';
import { Form, Title, Field, Input, ErrorText } from './addStyle';
import { Picker } from '@react-native-picker/picker';

export interface FormData {
  nome: string;
  crm: string;
  especialidade: string;
  hospital_id: string;
}

export interface Option {
  id: string;
  nome: string;
}

const MedicoAdd: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    crm: '',
    especialidade: '',
    hospital_id: '',
  });

  const [hospitais, setHospitais] = useState<Option[]>([]);

  useEffect(() => {
      const fetchOptions = async () => {
          try {
              const hospitaisResponse = await fetch('http://192.168.0.15:3000/hospital');

              if (!hospitaisResponse.ok) {
                  throw new Error('Erro ao carregar opções');
              }

              const hospitaisDataResponse = await hospitaisResponse.json();

              if (hospitaisDataResponse.status) {
                  const hospitaisData: Option[] = hospitaisDataResponse.hospital.map((hospital: any) => ({
                      id: hospital.id.toString(),
                      nome: hospital.nome,
                  }));
                  setHospitais(hospitaisData);
              } else {
                  Alert.alert('Erro ao carregar hospitais.');
              }
          } catch (error) {
              console.error('Erro ao carregar opções:', error);
              Alert.alert('Erro ao carregar hospitais.');
          }
      };

      fetchOptions();
  }, []);

  const [errors, setErrors] = useState<FormData>({
    nome: '',
    crm: '',
    especialidade: '',
    hospital_id: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.0.15:3000/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {

        if (response.status === 409) {
          Alert.alert('Email ja esta cadastrado no sistema!');
          return;
        }

        throw new Error('Erro ao conectar com a API');

      }

      const data = await response.json();
      console.log('Dados da API:', data);
      Alert.alert('Médico cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao se comunicar com a API:', error);
    }
  };

  return (
    <Form>
      <Title>Médico</Title>

      {/* Nome Completo */}
      <Field>
        <Input
          placeholder="Nome Completo*"
          value={formData.nome}
          onChangeText={(value) => handleInputChange('nome', value)}
        />
        {errors.nome && <ErrorText>{errors.nome}</ErrorText>}
      </Field>

      {/* CRM */}
      <Field>
        <Input
          placeholder="CRM*"
          value={formData.crm}
          onChangeText={(value) => handleInputChange('crm', value)}
        />
        {errors.crm && <ErrorText>{errors.crm}</ErrorText>}
      </Field>

      {/* Especialidade */}
      <Field>
        <Input
          placeholder="Especialidade*"
          value={formData.especialidade}
          onChangeText={(value) => handleInputChange('especialidade', value)}
        />
        {errors.especialidade && <ErrorText>{errors.especialidade}</ErrorText>}
      </Field>

      <Field style={styles.pickerWrapper}>
                <Picker
                    selectedValue={formData.hospital_id}
                    onValueChange={(value: string) => handleInputChange('hospital_id', value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um hospital*" value="" />
                    {hospitais.map((hospital) => (
                        <Picker.Item key={hospital.id} label={hospital.nome} value={hospital.id} />
                    ))}
                </Picker>
                {errors.hospital_id && <ErrorText>{errors.hospital_id}</ErrorText>}
            </Field>

      {/* Botão Cadastrar */}
      <Button title="Cadastrar" onPress={handleSubmit} color="#28a745" />
    </Form>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
      marginVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
  picker: {
      height: 50,
      width: '100%',
      paddingHorizontal: 8,
      fontSize: 16,
      color: '#495057',
      borderWidth: 0,
  },
});

export default MedicoAdd;
