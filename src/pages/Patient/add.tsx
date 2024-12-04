import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { validateFields } from './validation';
import { Form, Title, Field, Input, ErrorText } from './addStyle';

export interface FormData {
    nome: string;
    endereco: string;
    cpf: string;
    telefone: string;
    email: string;
    
}

const PacienteAdd: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        endereco: '',
        cpf: '',
        telefone: '',
        email: '',
    });

    const [errors, setErrors] = useState<FormData>({
        nome: '',
        endereco: '',
        cpf: '',
        telefone: '',
        email: '',        
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.11.188:3000/paciente', {
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
            Alert.alert('Paciente cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao se comunicar com a API:', error);
        }
    };

    return (
        <Form>
            <Title>Cadastrar Paciente</Title>

            <Field>
                <Input
                    placeholder="Nome Completo*"
                    value={formData.nome}
                    onChangeText={(value) => handleInputChange('nome', value)}
                />
                {errors.nome && <ErrorText>{errors.nome}</ErrorText>}
            </Field>

            <Field>
                <Input
                    placeholder="Endereco*"
                    value={formData.endereco}
                    onChangeText={(value) => handleInputChange('endereco', value)}
                />
                {errors.endereco && <ErrorText>{errors.endereco}</ErrorText>}
            </Field>

            <Field>
                <Input
                    placeholder="CPF*"
                    value={formData.cpf}
                    onChangeText={(value) => handleInputChange('cpf', value)}
                />
                {errors.cpf && <ErrorText>{errors.cpf}</ErrorText>}
            </Field>

            <Field>
                <Input
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChangeText={(value) => handleInputChange('telefone', value)}
                    keyboardType="phone-pad"
                />
                {errors.telefone && <ErrorText>{errors.telefone}</ErrorText>}
            </Field>

            <Field>
                <Input
                    placeholder="E-mail*"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </Field>
            
            <Button title="Cadastrar" onPress={handleSubmit} color="#28a745" />
        </Form>
    );
};

export default PacienteAdd;
