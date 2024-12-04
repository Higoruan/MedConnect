import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 16px;
    background-color: #f5f5f5;
`;

export const SearchBox = styled.View`
    margin-bottom: 16px;
    background-color: #fff;
    border-radius: 8px;
    padding: 8px;
    elevation: 2; /* Sombra no Android */
    shadow-color: #000; /* Sombra no iOS */
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
`;

export const SearchInput = styled.TextInput`
    height: 40px;
    font-size: 16px;
    padding: 0 8px;
    color: #333;
`;

export const CidCard = styled.View`
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    elevation: 2; /* Sombra no Android */
    shadow-color: #000; /* Sombra no iOS */
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
`;

export const CidName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 8px;
`;

export const CidDetails = styled.Text`
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 4px;
`;

export const Actions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 16px;
`;

export const ButtonEdit = styled.TouchableOpacity`
    background-color: #3498db;
    padding: 10px 16px;
    border-radius: 8px;
`;

export const ButtonDelete = styled.TouchableOpacity`
    background-color: #e74c3c;
    padding: 10px 16px;
    border-radius: 8px;
`;

export const ButtonText = styled.Text`
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    text-align: center;
`;
