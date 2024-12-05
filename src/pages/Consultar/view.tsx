import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import EditConsulta from '../Consultar/edit'; // Componente para editar consulta
import {
    Container,
    SearchBox,
    SearchInput,
    CidCard,
    CidName,
    CidDetails,
    Actions,
    ButtonEdit,
    ButtonDelete,
    ButtonText,
} from './viewStyle';

interface Consulta {
    id: number;
    data: string | null;
    descricao: string;
    medico_nome: string;
    paciente_nome: string;
}

const ConsultarConsulta: React.FC = () => {
    const [consultaList, setConsultaList] = useState<Consulta[]>([]);
    const [filteredConsultas, setFilteredConsultas] = useState<Consulta[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [consultaToEdit, setConsultaToEdit] = useState<Consulta | null>(null);

    useEffect(() => {
        fetchConsultas();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredConsultas(consultaList);
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = consultaList.filter(
                (consulta) =>
                    consulta.paciente_nome.toLowerCase().includes(lowerCaseQuery) ||
                    consulta.medico_nome.toLowerCase().includes(lowerCaseQuery) ||
                    (consulta.descricao && consulta.descricao.toLowerCase().includes(lowerCaseQuery))
            );
            setFilteredConsultas(filtered);
        }
    }, [searchQuery, consultaList]);

    const fetchConsultas = async () => {
        try {
            const response = await fetch('http://192.168.0.15:3000/consulta');
            if (!response.ok) {
                throw new Error('Erro ao carregar as consultas');
            }

            const data = await response.json();
            setConsultaList(data.consultas);
            setFilteredConsultas(data.consultas);
        } catch (error) {
            console.error('Erro ao carregar as consultas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as consultas');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://192.168.0.15:3000/consulta/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir a consulta');
            }

            Alert.alert('Sucesso', 'Consulta excluída com sucesso');
            fetchConsultas();
        } catch (error) {
            console.error('Erro ao excluir a consulta:', error);
            Alert.alert('Erro', 'Não foi possível excluir a consulta');
        }
    };

    const handleEdit = (consulta: Consulta) => {
        setConsultaToEdit(consulta);
    };

    const handleUpdate = () => {
        setConsultaToEdit(null);
        fetchConsultas();
    };

    return (
        <Container>
            <SearchBox>
                <SearchInput
                    placeholder="Buscar por paciente, médico ou descrição"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </SearchBox>

            {consultaToEdit ? (
                <EditConsulta consulta={consultaToEdit} onUpdate={handleUpdate} />
            ) : (
                <FlatList
                    data={filteredConsultas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CidCard>
                            <CidName>{item.paciente_nome}</CidName>
                            <CidDetails>{item.descricao}</CidDetails>
                            <CidDetails>{`Médico: ${item.medico_nome}`}</CidDetails>
                            <CidDetails>
                                {`Data: ${item.data ? new Date(item.data).toLocaleDateString() : 'Não informada'}`}
                            </CidDetails>

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

export default ConsultarConsulta;
