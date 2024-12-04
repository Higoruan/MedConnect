# MedConnect

*MedConnect* é uma aplicação para gerenciar informações hospitalares, como hospitais, médicos, pacientes, consultas, cids (Classificação Internacional de Doenças) e atestados.

## Sumário

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Rotas da API](#rotas-da-api)
- [Sobre o Sistema](#sobre-o-sistema)


## Instalação

Para configurar o projeto localmente, siga as etapas abaixo.

### Pré-requisitos

- *Node.js* (versão 14 ou superior)
- *MySQL* (para o banco de dados)
- *Expo* (para rodar na plataforma mobile)

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/Higoruan/MedConnect
   cd medconnect

2. Instale as dependências:

npm install
├── @babel/core@7.25.8
├── @expo/metro-runtime@3.2.3
├── @react-native-community/masked-view@0.1.11
├── @react-navigation/bottom-tabs@6.6.1
├── @react-navigation/native@6.1.18
├── @react-navigation/stack@6.4.1
├── @types/react@18.2.79
├── expo-status-bar@1.12.1
├── expo@51.0.37
├── medconnect@1.0.0 -> .\
├── react-dom@18.2.0
├── react-native-gesture-handler@2.20.2
├── react-native-reanimated@3.16.1
├── react-native-screens@3.35.0
├── react-native-web@0.19.12
├── react-native@0.74.5
├── react@18.2.0
├── styled-components@6.1.13
└── typescript@5.6.3

 3. Inicie o servidor:

npm start

O servidor estará em execução no endereço <http://192.168.25.36:8081>.

Dependências do Projeto

 • express: Framework para configurar rotas e gerenciar requisições HTTP.
 • mysql2: Biblioteca para conectar o Node.js ao MySQL.
 • dotenv: Carregar variáveis de ambiente de um arquivo .env.
 
Documentação da API

A documentação da API está disponível em <http://192.168.25.36:8081/documentation>.

Estrutura do Banco de Dados

Tabelas

1. Hospital

Armazena informações dos hospitais.
• Campos: id, nome, endereco, telefone, email, cnpj, senha

2. Medico

Armazena informações dos médicos vinculados a um hospital.
• Campos: id, nome, crm, especialidade, senha, Hospital_id (chave estrangeira)

3. Paciente

Armazena informações dos pacientes.
 • Campos: id, nome, cpf, endereco, telefone, email, senha

4. Consulta

Armazena informações sobre as consultas realizadas.
 • Campos: id, data, Medico_id, Paciente_id, descricao

5. Cids

Armazena a lista de CIDs (Classificação Internacional de Doenças).
 • Campos: id, cod, descricao

6. Atestado

Armazena atestados médicos emitidos.
 • Campos: id, data, Medico_id, Paciente_id, Cids_id, descricao

## Rotas da API

A API oferece operações CRUD para cada uma das entidades no sistema. Aqui estão o exemplo das principais rotas para a entidade Hospital:
 • GET /hospital: Retorna todos os hospitais.
 • POST /hospital: Cria um novo hospital.
 • PUT /hospital/:id: Atualiza um hospital pelo ID.
 • DELETE /hospital/:id: Deleta um hospital pelo ID.

## Sobre o Sistema:

O sistema foi planejado e desenvolvido para facilitar a informatização no processo de comunicação entre pacientes e hospitais, especialmente no agendamento de consultas com médicos especializados, conforme as necessidades do paciente. Ele será utilizado exclusivamente pelo hospital, que será responsável pelo cadastro de pacientes e médicos de diferentes especialidades. Além disso, o sistema contará com uma funcionalidade para registrar e armazenar atestados médicos, permitindo que os pacientes tenham acesso a esse documento sempre que necessário.
