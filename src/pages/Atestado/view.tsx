import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import EditAtestado from '../Atestado/edit';
import {
    Container,
    CidCard,
    CidName,
    CidDetails,
    Actions,
    ButtonEdit,
    ButtonDelete,
    ButtonText
} from './viewStyle';

interface Atestado {
    id: number;
    data: string | null;
    descricao: string;
    medico_nome: string;
    paciente_nome: string;
    cid_nome: string;
}

const AtestadoList: React.FC = () => {
    const [atestadoList, setAtestadoList] = useState<Atestado[]>([]);
    const [atestadoToEdit, setAtestadoToEdit] = useState<Atestado | null>(null);

    useEffect(() => {
        fetchAtestados();
    }, []);

    const fetchAtestados = async () => {
        try {
            const response = await fetch('http://localhost:3000/atestado');
            if (!response.ok) {
                throw new Error('Erro ao carregar os atestados');
            }

            const data = await response.json();
            setAtestadoList(data.atestado);
        } catch (error) {
            console.error('Erro ao carregar os atestados:', error);
            Alert.alert('Erro', 'Não foi possível carregar os atestados');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/atestado/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o atestado');
            }

            Alert.alert('Sucesso', 'Atestado excluído com sucesso');
            fetchAtestados();
        } catch (error) {
            console.error('Erro ao excluir o atestado:', error);
            Alert.alert('Erro', 'Não foi possível excluir o atestado');
        }
    };

    const handleEdit = (atestado: Atestado) => {
        setAtestadoToEdit(atestado);
    };

    const handleUpdate = () => {
        setAtestadoToEdit(null);
        fetchAtestados();
    };

    return (
        <Container>
            {atestadoToEdit ? (
                <EditAtestado atestado={atestadoToEdit} onUpdate={handleUpdate} />
            ) : (
                <FlatList
                    data={atestadoList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CidCard>
                            <CidName>{item.paciente_nome}</CidName>
                            <CidDetails>{item.descricao}</CidDetails>
                            <CidDetails>{`Médico: ${item.medico_nome}`}</CidDetails>
                            <CidDetails>{`CID: ${item.cid_nome}`}</CidDetails>
                            <CidDetails>{`Data: ${item.data ? new Date(item.data).toLocaleDateString() : 'Não informada'}`}</CidDetails>

                            <Actions>
                                <ButtonEdit onPress={() => handleEdit(item)}>
                                    <ButtonText>Editar</ButtonText>
                                </ButtonEdit>

                                <ButtonDelete onPress={() => handleDelete(item.id)}>
                                    <ButtonText>Excluir</ButtonText>
                                </ButtonDelete>
                            </Actions>
                        </CidCard>
                    )}
                />
            )}
        </Container>
    );
};

export default AtestadoList;
