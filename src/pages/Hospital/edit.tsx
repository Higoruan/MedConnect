import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação
import * as S from './editStyle';

interface Hospital {
    id: number;
    nome: string;
    endereco: string;
    cnpj: string;
    telefone: string;
    email: string;
    senha: string;
}

interface EditHospProps {
    hospital: Hospital;
    onUpdate: () => void; // Callback para atualizar a lista de hospitais
}

const EditHosp: React.FC<EditHospProps> = ({ hospital, onUpdate }) => {
    const navigation = useNavigation(); // Hook para navegação
    const [nome, setNome] = useState(hospital.nome);
    const [endereco, setEndereco] = useState(hospital.endereco);
    const [telefone, setTelefone] = useState(hospital.telefone);
    const [email, setEmail] = useState(hospital.email);

    // Função para lidar com o cancelamento
    const handleCanceled = () => {
        // Volta para a tela anterior
        navigation.goBack();
    };

    const handleSaveChanges = async () => {
        const formData = {
            nome,
            endereco,
            telefone,
            email,
        };

        try {
            const response = await fetch(`http://192.168.126.203:3000/hospital/${hospital.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o hospital');
            }

            onUpdate(); // Atualiza a lista de hospitais
        } catch (error) {
            console.error('Erro ao atualizar hospital:', error);
        }
    };

    return (
        <S.Container>
            <S.Title>Editar Hospital</S.Title>
            <S.Form>
                <S.Field>
                    <S.InputLabel>Nome</S.InputLabel>
                    <S.Input value={nome} onChangeText={setNome} />
                </S.Field>
                <S.Field>
                    <S.InputLabel>Endereço</S.InputLabel>
                    <S.Input value={endereco} onChangeText={setEndereco} />
                </S.Field>
                <S.Field>
                    <S.InputLabel>Telefone</S.InputLabel>
                    <S.Input value={telefone} onChangeText={setTelefone} />
                </S.Field>
                <S.Field>
                    <S.InputLabel>Email</S.InputLabel>
                    <S.Input value={email} onChangeText={setEmail} />
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

export default EditHosp;
