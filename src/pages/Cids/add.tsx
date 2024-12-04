import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { validateFields } from './validation';
import { Form, Title, Field, Input, ErrorText } from './addStyle';

export interface FormData {
    id: string;
    nome: string;
    cod: string;
    descricao: string;
}

const CidAdd: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        nome: '',
        cod: '',
        descricao: ''
    });

    const [errors, setErrors] = useState<FormData>({
        id: '',
        nome: '',
        cod: '',
        descricao: '',
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/cids', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {

                if (response.status === 409) {
                    Alert.alert('CID já está cadastrado no sistema!');
                    return;
                }

                throw new Error('Erro ao conectar com a API');

            }

            const data = await response.json();
            console.log('Dados da API:', data);
            Alert.alert('CID cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao se comunicar com a API:', error);
        }
    };

    return (
        <Form>
            <Title>Cadastrar CID</Title>

            <Field>
                <Input
                    placeholder="Nome*"
                    value={formData.nome}
                    onChangeText={(value) => handleInputChange('nome', value)}
                />
                {errors.nome && <ErrorText>{errors.nome}</ErrorText>}
            </Field>

            <Field>
                <Input
                    placeholder="Código*"
                    value={formData.cod}
                    onChangeText={(value) => handleInputChange('cod', value)}
                />
                {errors.cod && <ErrorText>{errors.cod}</ErrorText>}
            </Field>

            <Field>
                <Input
                    placeholder="Descrição"
                    value={formData.descricao}
                    onChangeText={(value) => handleInputChange('descricao', value)}
                />
                {errors.descricao && <ErrorText>{errors.descricao}</ErrorText>}
            </Field>

            <Button title="Cadastrar" onPress={handleSubmit} color="#28a745" />
        </Form>
    );
};

export default CidAdd;
