import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import EditPac from './edit';
import {
    Container,
    PacienteCard,
    PacienteName,
    PacienteDetails,
    Actions,
    ButtonEdit,
    ButtonDelete,
    ButtonText
} from './viewStyle';

interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    endereco: string;
    telefone: string;
    email: string;
}

const PacienteList: React.FC = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [pacienteToEdit, setPacienteToEdit] = useState<Paciente | null>(null);

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/paciente');
            if (!response.ok) {
                throw new Error('Erro ao carregar os pacientes');
            }

            const data = await response.json();
            setPacientes(data.paciente);
        } catch (error) {
            console.error('Erro ao carregar pacientes:', error);
            Alert.alert('Erro', 'Não foi possível carregar os pacientes');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/paciente/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o paciente');
            }

            Alert.alert('Sucesso', 'Paciente excluído com sucesso');
            fetchPacientes();
        } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            Alert.alert('Erro', 'Não foi possível excluir o paciente');
        }
    };

    const handleEdit = (paciente: Paciente) => {
        setPacienteToEdit(paciente); // Define o paciente para edição
    };

    const handleUpdate = () => {
        setPacienteToEdit(null); // Fecha a tela de edição
        fetchPacientes(); // Atualiza a lista de pacientes
    };

    return (
        <Container>
            {pacienteToEdit ? (
                <EditPac paciente={pacienteToEdit} onUpdate={handleUpdate} />
            ) : (
                <FlatList
                    data={pacientes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <PacienteCard>
                            <PacienteName>{item.nome}</PacienteName>
                            <PacienteDetails>{item.endereco}</PacienteDetails>
                            <PacienteDetails>{item.telefone}</PacienteDetails>
                            <PacienteDetails>{item.email}</PacienteDetails>

                            <Actions>
                                <ButtonEdit onPress={() => handleEdit(item)}>
                                    <ButtonText>Editar</ButtonText>
                                </ButtonEdit>

                                <ButtonDelete onPress={() => handleDelete(item.id)}>
                                    <ButtonText>Excluir</ButtonText>
                                </ButtonDelete>
                            </Actions>
                        </PacienteCard>
                    )}
                />
            )}
        </Container>
    );
};

export default PacienteList;
