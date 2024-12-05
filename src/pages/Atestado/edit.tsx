import React, { useState, useEffect } from 'react';
import { Button, Alert, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Form, Title, Field, Input, ErrorText } from './addStyle';

interface FormData {
    data: string;
    Medico_id: string;
    Paciente_id: string;
    Cids_id: string;
    descricao: string;
}

interface Option {
    id: string;
    nome: string;
}

interface EditAtestadoProps {
    atestado: {
        id: number;
        data: string | null;
        descricao: string;
        medico_nome: string;
        paciente_nome: string;
        cid_nome: string;
    };
    onUpdate: () => void;
}

const EditAtestado: React.FC<EditAtestadoProps> = ({ atestado, onUpdate }) => {
    const [formData, setFormData] = useState<FormData>({
        data: atestado.data || '',
        Medico_id: '',
        Paciente_id: '',
        Cids_id: '',
        descricao: atestado.descricao,
    });

    const [errors, setErrors] = useState<FormData>({
        data: '',
        Medico_id: '',
        Paciente_id: '',
        Cids_id: '',
        descricao: '',
    });

    const [medicos, setMedicos] = useState<Option[]>([]);
    const [pacientes, setPacientes] = useState<Option[]>([]);
    const [cids, setCids] = useState<Option[]>([]);

    // Carregar opções de médicos, pacientes e CIDs ao montar o componente
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const medicosResponse = await fetch('http://192.168.0.15:3000/doctor');
                const pacientesResponse = await fetch('http://192.168.0.15:3000/paciente');
                const cidsResponse = await fetch('http://192.168.0.15:3000/cids');

                if (!medicosResponse.ok || !pacientesResponse.ok || !cidsResponse.ok) {
                    throw new Error('Erro ao carregar opções');
                }

                const medicosDataResponse = await medicosResponse.json();
                const pacientesDataResponse = await pacientesResponse.json();
                const cidsDataResponse = await cidsResponse.json();

                if (medicosDataResponse.status) {
                    const medicosData: Option[] = medicosDataResponse.doctors.map((doc: any) => ({
                        id: doc.id.toString(),
                        nome: doc.nome,
                    }));
                    setMedicos(medicosData);
                } else {
                    Alert.alert('Erro ao carregar médicos.');
                }

                if (pacientesDataResponse.status) {
                    const pacientesData: Option[] = pacientesDataResponse.paciente.map((pac: any) => ({
                        id: pac.id.toString(),
                        nome: pac.nome,
                    }));
                    setPacientes(pacientesData);
                } else {
                    Alert.alert('Erro ao carregar pacientes.');
                }

                if (cidsDataResponse.status) {
                    const cidsData: Option[] = cidsDataResponse.cids.map((cid: any) => ({
                        id: cid.id.toString(),
                        nome: cid.descricao,
                    }));
                    setCids(cidsData);
                } else {
                    Alert.alert('Erro ao carregar CIDs.');
                }
            } catch (error) {
                console.error('Erro ao carregar opções:', error);
                Alert.alert('Erro ao carregar médicos, pacientes e CIDs.');
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
            if (!formData.Medico_id || !formData.Paciente_id || !formData.data || !formData.Cids_id) {
                Alert.alert('Preencha todos os campos obrigatórios.');
                return;
            }

            const response = await fetch(`http://192.168.0.15:3000/atestado/${atestado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    Alert.alert('Atestado já cadastrado no sistema!');
                    return;
                }

                throw new Error('Erro ao conectar com a API');
            }

            Alert.alert('Atestado editado com sucesso!');
            onUpdate();
        } catch (error) {
            console.error('Erro ao se comunicar com a API:', error);
        }
    };

    return (
        <Form>
            <Title>Editar Atestado</Title>

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

            <Field style={styles.pickerWrapper}>
                <Picker
                    selectedValue={formData.Cids_id}
                    onValueChange={(value: string) => handleInputChange('Cids_id', value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um CID*" value="" />
                    {cids.map((cid) => (
                        <Picker.Item key={cid.id} label={cid.nome} value={cid.id} />
                    ))}
                </Picker>
                {errors.Cids_id && <ErrorText>{errors.Cids_id}</ErrorText>}
            </Field>

            <Field>
                <Input
                    placeholder="Descrição"
                    value={formData.descricao}
                    onChangeText={(value: string) => handleInputChange('descricao', value)}
                    multiline
                    numberOfLines={4} // Ajuste conforme necessário
                />
                {errors.descricao && <ErrorText>{errors.descricao}</ErrorText>}
            </Field>

            <Button title="Salvar alterações" onPress={handleSubmit} color="#28a745" />
        </Form>
    );
};

// Estilos customizados para os inputs e select
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

export default EditAtestado;
