import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import EditDoc from '../doctor/edit';
import {
    Container,
    DoctorCard,
    DoctorName,
    DoctorDetails,
    Actions,
    ButtonEdit,
    ButtonDelete,
    ButtonText
} from './viewStyle';

interface Doctor {
    id: number;
    nome: string;
    crm: string;
    especialidade: string;
    nomeHospital: string;
}

const DoctorView: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctorToEdit, setDoctorToEdit] = useState<Doctor | null>(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://192.168.0.15:3000/doctor');
            if (!response.ok) {
                throw new Error('Erro ao carregar os doctors');
            }

            const data = await response.json();
            setDoctors(data.doctors);
        } catch (error) {
            console.error('Erro ao carregar doctors:', error);
            Alert.alert('Erro', 'Não foi possível carregar os doctors');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://192.168.0.15:3000/doctor/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o doctor');
            }

            Alert.alert('Sucesso', 'Doctor excluído com sucesso');
            fetchDoctors();
        } catch (error) {
            console.error('Erro ao excluir doctor:', error);
            Alert.alert('Erro', 'Não foi possível excluir o doctor');
        }
    };

    const handleEdit = (doctor: Doctor) => {
        setDoctorToEdit(doctor); // Define o doctor para edição
    };

    const handleUpdate = () => {
        setDoctorToEdit(null); // Fecha a tela de edição
        fetchDoctors(); // Atualiza a lista de doctors
    };

    return (
        <Container>
            {doctorToEdit ? (
                <EditDoc doctor={doctorToEdit} onUpdate={handleUpdate} />
            ) : (
                <FlatList
                    data={doctors}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <DoctorCard>
                            <DoctorName>{item.nome}</DoctorName>
                            <DoctorDetails>{item.crm}</DoctorDetails>
                            <DoctorDetails>{item.especialidade}</DoctorDetails>
                            <DoctorDetails>{item.nomeHospital}</DoctorDetails>

                            <Actions>
                                <ButtonEdit onPress={() => handleEdit(item)}>
                                    <ButtonText>Editar</ButtonText>
                                </ButtonEdit>

                                <ButtonDelete onPress={() => handleDelete(item.id)}>
                                    <ButtonText>Excluir</ButtonText>
                                </ButtonDelete>
                            </Actions>
                        </DoctorCard>
                    )}
                />
            )}
        </Container>
    );
};

export default DoctorView;
