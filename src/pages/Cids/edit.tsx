import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as S from './editstyle';

interface Cid {
    id: number;
    nome: string;
    descricao: string;
}

interface EditCidProps {
    cid: Cid;
    onUpdate: () => void;
}

const EditCid: React.FC<EditCidProps> = ({ cid, onUpdate }) => {
    const navigation = useNavigation();
    const [nome, setnome] = useState(cid.nome);
    const [descricao, setDescricao] = useState(cid.descricao);

    const handleCanceled = () => {
        navigation.goBack();
    };

    const handleSaveChanges = async () => {
        const formData = {
            nome,
            descricao,
        };

        try {
            const response = await fetch(`http://localhost:3000/cids/${cid.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o CID');
            }

            onUpdate();
        } catch (error) {
            console.error('Erro ao atualizar CID:', error);
        }
    };

    return (
        <S.Container>
            <S.Title>Editar CID</S.Title>
            <S.Form>
                <S.Field>
                    <S.InputLabel>Nome</S.InputLabel>
                    <S.Input value={nome} onChangeText={setnome} />
                </S.Field>
                <S.Field>
                    <S.InputLabel>Descrição</S.InputLabel>
                    <S.Input value={descricao} onChangeText={setDescricao} />
                </S.Field>

                <S.ButtonContainer>
                    <S.Button onPress={handleSaveChanges}>
                        <S.ButtonText>Salvar</S.ButtonText>
                    </S.Button>

                    <S.ButtonCancel onPress={handleCanceled}>
                        <S.ButtonTextCancel>Cancelar</S.ButtonTextCancel>
                    </S.ButtonCancel>
                </S.ButtonContainer>
            </S.Form>
        </S.Container>
    );
};

export default EditCid;
