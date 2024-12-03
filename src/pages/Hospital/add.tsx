import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { validateFields } from './validation';
import { Form, Title, Field, Input, ErrorText } from './addStyle';

export interface FormData {
    nome: string;
    endereco: string;
    cnpj: string;
    telefone: string;
    email: string;
    senha: string;
}

const HospitalAdd: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        endereco: '',
        cnpj: '',
        telefone: '',
        email: '',
        senha: ''
    });

    const [errors, setErrors] = useState<FormData>({
        nome: '',
        endereco: '',
        cnpj: '',
        telefone: '',
        email: '',
        senha: '',
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.25.36:3000/hospital', {
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
            <Title>Cadastrar Hospital</Title>

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
                    placeholder="CNPJ*"
                    value={formData.cnpj}
                    onChangeText={(value) => handleInputChange('cnpj', value)}
                />
                {errors.cnpj && <ErrorText>{errors.cnpj}</ErrorText>}
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

            <Field>
                <Input
                    placeholder="Senha*"
                    value={formData.senha}
                    onChangeText={(value) => handleInputChange('senha', value)}
                    keyboardType="default"
                />
                {errors.senha && <ErrorText>{errors.senha}</ErrorText>}
            </Field>

            <Button title="Cadastrar" onPress={handleSubmit} color="#28a745" />
        </Form>
    );
};

export default HospitalAdd;
