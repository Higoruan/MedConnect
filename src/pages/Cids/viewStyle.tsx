import styled from 'styled-components/native';

// Container principal da lista de hospitais
export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

// Cartão de cada Cid
export const CidCard = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-offset: 0 4px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
`;

// Nome do Cid
export const CidName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

// Detalhes do Cid (endereço, telefone, etc.)
export const CidDetails = styled.Text`
  font-size: 14px;
  color: #777;
  margin-top: 5px;
`;

// Ações (botões de editar e excluir)
export const Actions = styled.View`
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
`;

// Botão de edição
export const ButtonEdit = styled.TouchableOpacity`
  background-color: #007bff;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 5px;
  align-items: center;
`;

// Botão de exclusão
export const ButtonDelete = styled.TouchableOpacity`
  background-color: #dc3545;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 5px;
  align-items: center;
`;

// Texto do botão
export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;
