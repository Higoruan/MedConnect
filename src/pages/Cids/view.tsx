import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import EditCid from '../Cids/edit';
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

interface Cid {
    id: number;
    nome: string;
    descricao: string;
}

const CidList: React.FC = () => {
    const [cids, setCids] = useState<Cid[]>([]);
    const [cidToEdit, setCidToEdit] = useState<Cid | null>(null);

    useEffect(() => {
        fetchCids();
    }, []);

    const fetchCids = async () => {
        try {
            const response = await fetch('http://localhost:3000/cids');
            if (!response.ok) {
                throw new Error('Erro ao carregar os CIDs');
            }

            const data = await response.json();
            setCids(data.cids);
        } catch (error) {
            console.error('Erro ao carregar os CIDs:', error);
            Alert.alert('Erro', 'Não foi possível carregar os CIDs');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/cids/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o CID');
            }

            Alert.alert('Sucesso', 'CID excluído com sucesso');
            fetchCids();
        } catch (error) {
            console.error('Erro ao excluir o CID:', error);
            Alert.alert('Erro', 'Não foi possível excluir o CID');
        }
    };

    const handleEdit = (cid: Cid) => {
        setCidToEdit(cid);
    };

    const handleUpdate = () => {
        setCidToEdit(null);
        fetchCids();
    };

    return (
        <Container>
            {cidToEdit ? (
                <EditCid cid={cidToEdit} onUpdate={handleUpdate} />
            ) : (
                <FlatList
                    data={cids}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CidCard>
                            <CidName>{item.nome}</CidName>
                            <CidDetails>{item.descricao}</CidDetails>

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

export default CidList;