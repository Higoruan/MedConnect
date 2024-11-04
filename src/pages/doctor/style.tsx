import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  align-items: center; /* Você pode manter isso se quiser centralizar os itens horizontalmente */
  justify-content: flex-start; /* Muda para flex-start para começar do topo */
`;

export const Form = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%; /* Muda para 100% para ocupar toda a largura */
  height: 100%; /* Muda para 100% para ocupar toda a altura */
  background: white;
  padding: 20px; /* Você pode manter ou ajustar o padding se necessário */
  border-radius: 0; /* Remove o border-radius para que não haja cantos arredondados */
  box-shadow: none; /* Remove a sombra */
`;

export const Input = styled.TextInput`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  background-color: #007bff;
  border-radius: 4px;
  align-items: center;

  &:active {
    background-color: #0056b3; /* Se você quiser adicionar um efeito de pressionar */
  }
`;

export const ButtonText = styled.Text`
  color: white;
`;

export const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 15px;
  font-size: 0.9em;
`;
