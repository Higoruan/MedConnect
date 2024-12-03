import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { validateFields } from './validation';
import { Form, Title, Field, Input, ErrorText } from './addStyle';

export interface FormData {
    nomeCompleto: string;
    crm: string;
    especialidade: string;
  }
  
  const MedicoForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      nomeCompleto: '',
      crm: '',
      especialidade: '',
    });
  
    const [errors, setErrors] = useState<FormData>({
      nomeCompleto: '',
      crm: '',
      especialidade: '',
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.25.36:3000/doctor', {
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
              value={formData.nomeCompleto}
              onChangeText={(value) => handleInputChange('nomeCompleto', value)}
            />
            {errors.nomeCompleto && <ErrorText>{errors.nomeCompleto}</ErrorText>}
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
          {/* Botão Cadastrar */}
          <Button title="Cadastrar" onPress={handleSubmit} color="#28a745" />
        </Form>
      );
    };
    
    export default MedicoForm;
