import React, { useState, useEffect } from 'react';
import { Button, Alert, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Form, Title, Field, Input, ErrorText } from './addStyle';

interface FormData {
    data: string;
    Medico_id: string;
    Paciente_id: string;
    descricao: string;
}

interface Option {
    id: string;
    nome: string;
}

interface EditConsultaProps {
    consulta: {
        id: number;
        data: string | null;
        descricao: string;
        medico_nome: string;
        paciente_nome: string;
    };
    onUpdate: () => void;
}

const EditConsulta: React.FC<EditConsultaProps> = ({ consulta, onUpdate }) => {
    const [formData, setFormData] = useState<FormData>({
        data: consulta.data || '',
        Medico_id: '',
        Paciente_id: '',
        descricao: consulta.descricao,
    });

    const [errors, setErrors] = useState<FormData>({
        data: '',
        Medico_id: '',
        Paciente_id: '',
        descricao: '',
    });

    const [medicos, setMedicos] = useState<Option[]>([]);
    const [pacientes, setPacientes] = useState<Option[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const medicosResponse = await fetch('http://192.168.0.15:3000/doctor');
                const pacientesResponse = await fetch('http://192.168.0.15:3000/paciente');

                if (!medicosResponse.ok || !pacientesResponse.ok) {
                    throw new Error('Erro ao carregar opções');
                }

                const medicosData = await medicosResponse.json();
                const pacientesData = await pacientesResponse.json();

                setMedicos(
                    medicosData.doctors.map((doc: any) => ({
                        id: doc.id.toString(),
                        nome: doc.nome,
                    }))
                );
                setPacientes(
                    pacientesData.paciente.map((pac: any) => ({
                        id: pac.id.toString(),
                        nome: pac.nome,
                    }))
                );
            } catch (error) {
                console.error('Erro ao carregar opções:', error);
                Alert.alert('Erro ao carregar médicos e pacientes.');
            }
        };

        fetchOptions();
    }, []);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleSubmit = async () => {
        try {
            if (!formData.Medico_id || !formData.Paciente_id || !formData.data) {
                Alert.alert('Preencha todos os campos obrigatórios.');
                return;
            }

            const response = await fetch(`http://192.168.0.15:3000/consulta/${consulta.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao conectar com a API');
            }

            Alert.alert('Consulta editada com sucesso!');
            onUpdate();
        } catch (error) {
            console.error('Erro ao se comunicar com a API:', error);
        }
    };

    return (
        <Form>
            <Title>Editar Consulta</Title>

            <Field>
                <Input
                    placeholder="Data (YYYY-MM-DD)*"
                    value={formData.data}
                    onChangeText={(value: string) => handleInputChange('data', value)}
                />
                {errors.data && <ErrorText>{errors.data}</ErrorText>}
            </Field>

            <Field style={styles.pickerWrapper}>
                <Picker
                    selectedValue={formData.Medico_id}
                    onValueChange={(value: string) => handleInputChange('Medico_id', value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um médico*" value="" />
                    {medicos.map((medico) => (
                        <Picker.Item key={medico.id} label={medico.nome} value={medico.id} />
                    ))}
                </Picker>
                {errors.Medico_id && <ErrorText>{errors.Medico_id}</ErrorText>}
            </Field>

            <Field style={styles.pickerWrapper}>
                <Picker
                    selectedValue={formData.Paciente_id}
                    onValueChange={(value: string) => handleInputChange('Paciente_id', value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um paciente*" value="" />
                    {pacientes.map((paciente) => (
                        <Picker.Item key={paciente.id} label={paciente.nome} value={paciente.id} />
                    ))}
                </Picker>
                {errors.Paciente_id && <ErrorText>{errors.Paciente_id}</ErrorText>}
            </Field>

            <Field>
                <Input
                    placeholder="Descrição"
                    value={formData.descricao}
                    onChangeText={(value: string) => handleInputChange('descricao', value)}
                    multiline
                    numberOfLines={4}
                />
                {errors.descricao && <ErrorText>{errors.descricao}</ErrorText>}
            </Field>

            <Button title="Salvar alterações" onPress={handleSubmit} color="#28a745" />
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
        fontSize: 16,
        color: '#495057',
    },
});

export default EditConsulta;
