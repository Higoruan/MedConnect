import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação
import * as S from './editStyle';

interface Doctor {
    id: number;
    nomeCompleto: string;
    crm: string;
    especialidade: string;
}

interface EditDocProps {
    doctor: Doctor;
    onUpdate: () => void; // Callback para atualizar a lista de hospitais
}

const EditDoc: React.FC<EditDocProps> = ({ doctor, onUpdate }) => {
    const navigation = useNavigation(); // Hook para navegação
    const [nomeCompleto, setNome] = useState(doctor.nomeCompleto);
    const [crm, setCrm] = useState(doctor.crm);
    const [especialidade, setEspecialidade] = useState(doctor.especialidade);

    // Função para lidar com o cancelamento
    const handleCanceled = () => {
        // Volta para a tela anterior
        navigation.goBack();
    };

    const handleSaveChanges = async () => {
        const formData = {
            nomeCompleto,
            crm,
            especialidade,
        };

        try {
            const response = await fetch(`http://localhost:3000/doctor/${doctor.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o doctor');
            }

            onUpdate(); // Atualiza a lista de hospitais
        } catch (error) {
            console.error('Erro ao atualizar doctor:', error);
        }
    };

    return (
        <S.Container>
            <S.Title>Editar Doctor</S.Title>
            <S.Form>
                <S.Field>
                    <S.InputLabel>Nome</S.InputLabel>
                    <S.Input value={nomeCompleto} onChangeText={setNome} />
                </S.Field>
                <S.Field>
                    <S.InputLabel>CRM</S.InputLabel>
                    <S.Input value={crm} onChangeText={setCrm} />
                </S.Field>
                <S.Field>
                    <S.InputLabel>Especialidade</S.InputLabel>
                    <S.Input value={especialidade} onChangeText={setEspecialidade} />
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

export default EditDoc;
