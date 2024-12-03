import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`;

export const Form = styled.View`
    flex: 1;
`;

export const Field = styled.View`
    margin-bottom: 15px;
`;

export const InputLabel = styled.Text`
    font-size: 16px;
    margin-bottom: 5px;
`;

export const Input = styled.TextInput`
    height: 40px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
`;

export const ButtonContainer = styled.View`
    margin-top: 20px;
    flex-direction: row;  /* Adiciona os botões lado a lado */
    justify-content: space-between; /* Garante que os botões fiquem distribuídos */
`;

export const Button = styled.TouchableOpacity`
    background-color: #28a745;
    padding: 10px 20px;
    border-radius: 5px;
    align-items: center;
    flex: 1;  /* Os botões vão ocupar o mesmo espaço */
    margin-right: 10px;  /* Espaçamento entre os botões */
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
`;

export const ButtonCancel = styled.TouchableOpacity`
    background-color: #f44336;
    padding: 10px 20px;
    border-radius: 5px;
    align-items: center;
    flex: 1;  /* Os botões vão ocupar o mesmo espaço */
`;

export const ButtonTextCancel = styled.Text`
    color: white;
    font-size: 16px;
`;
