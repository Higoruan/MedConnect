import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import EditHosp from '../Hospital/edit';
import {
    Container,
    HospitalCard,
    HospitalName,
    HospitalDetails,
    Actions,
    ButtonEdit,
    ButtonDelete,
    ButtonText
} from './viewStyle';

interface Hospital {
    id: number;
    nome: string;
    endereco: string;
    cnpj: string;
    telefone: string;
    email: string;
    senha: string;
}

const HospitalList: React.FC = () => {
    const [hospitais, setHospitais] = useState<Hospital[]>([]);
    const [hospitalToEdit, setHospitalToEdit] = useState<Hospital | null>(null);

    useEffect(() => {
        fetchHospitais();
    }, []);

    const fetchHospitais = async () => {
        try {
            const response = await fetch('http://192.168.25.36:3000/hospital');
            if (!response.ok) {
                throw new Error('Erro ao carregar os hospitais');
            }

            const data = await response.json();
            setHospitais(data.hospital);
        } catch (error) {
            console.log(error);
            console.error('Erro ao carregar hospitais:', error);
            Alert.alert('Erro', 'Não foi possível carregar os hospitais');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://192.168.25.36:3000/hospital/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o hospital');
            }

            Alert.alert('Sucesso', 'Hospital excluído com sucesso');
            fetchHospitais();
        } catch (error) {
            console.error('Erro ao excluir hospital:', error);
            Alert.alert('Erro', 'Não foi possível excluir o hospital');
        }
    };

    const handleEdit = (hospital: Hospital) => {
        setHospitalToEdit(hospital);
    };

    const handleUpdate = () => {
        setHospitalToEdit(null);
        fetchHospitais();
    };

    return (
        <Container>
            {hospitalToEdit ? (
                <EditHosp hospital={hospitalToEdit} onUpdate={handleUpdate} />
            ) : (
                <FlatList
                    data={hospitais}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <HospitalCard>
                            <HospitalName>{item.nome}</HospitalName>
                            <HospitalDetails>{item.endereco}</HospitalDetails>
                            <HospitalDetails>{item.telefone}</HospitalDetails>
                            <HospitalDetails>{item.email}</HospitalDetails>

                            <Actions>
                                <ButtonEdit onPress={() => handleEdit(item)}>
                                    <ButtonText>Editar</ButtonText>
                                </ButtonEdit>

                                <ButtonDelete onPress={() => handleDelete(item.id)}>
                                    <ButtonText>Excluir</ButtonText>
                                </ButtonDelete>
                            </Actions>
                        </HospitalCard>
                    )}
                />
            )}
        </Container>
    );
};

export default HospitalList;
