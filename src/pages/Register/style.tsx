import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Input = styled.TextInput`
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 15px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 20px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 123, 255, 0.3);
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
