import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  display: flex;
  flex-direction: column;
  width: 300px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
