import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { validateFields } from './validation';
import { Form, Title, Field, Input, ErrorText } from './style';

export interface FormData {
    nome: string;
    endereco: string;
    cnpj: string;
    telefone: string;
    email: string;
    senha: string;
}

const HospitalForm: React.FC = () => {
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

    const handleSubmit = () => {
        const validationErrors = validateFields(formData);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every((error) => error === '')) {
            console.log('Dados do formulário:', formData);
            Alert.alert('Médico cadastrado com sucesso!');
        }
    };

    return (
        <Form>
            <Title>Hospital</Title>

            {/* Nome Completo */}
            <Field>
                <Input
                    placeholder="Nome Completo*"
                    value={formData.nome}
                    onChangeText={(value) => handleInputChange('nome', value)}
                />
                {errors.nome && <ErrorText>{errors.nome}</ErrorText>}
            </Field>

            {/* endereco */}
            <Field>
                <Input
                    placeholder="Endereco*"
                    value={formData.endereco}
                    onChangeText={(value) => handleInputChange('endereco', value)}
                />
                {errors.endereco && <ErrorText>{errors.endereco}</ErrorText>}
            </Field>

            {/* cnpj */}
            <Field>
                <Input
                    placeholder="CNPJ*"
                    value={formData.cnpj}
                    onChangeText={(value) => handleInputChange('cnpj', value)}
                />
                {errors.cnpj && <ErrorText>{errors.cnpj}</ErrorText>}
            </Field>

            {/* Telefone */}
            <Field>
                <Input
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChangeText={(value) => handleInputChange('telefone', value)}
                    keyboardType="phone-pad"
                />
                {errors.telefone && <ErrorText>{errors.telefone}</ErrorText>}
            </Field>

            {/* E-mail */}
            <Field>
                <Input
                    placeholder="E-mail*"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </Field>

            {/* Senha */}
            <Field>
                <Input
                    placeholder="Senha*"
                    value={formData.senha}
                    onChangeText={(value) => handleInputChange('senha', value)}
                    keyboardType="default"
                />
                {errors.senha && <ErrorText>{errors.senha}</ErrorText>}
            </Field>

            {/* Botão Cadastrar */}
            <Button title="Cadastrar" onPress={handleSubmit} color="#28a745" />
        </Form>
    );
};

export default HospitalForm;
