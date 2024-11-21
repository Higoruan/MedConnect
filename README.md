# MedConnect

*MedConnect* é uma aplicação para gerenciar informações hospitalares, como hospitais, médicos, pacientes, consultas, cids (Classificação Internacional de Doenças) e atestados. 

## Sumário
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Rotas da API](#rotas-da-api)
- [Licença](#licença)

## Instalação

Para configurar o projeto localmente, siga as etapas abaixo.

### Pré-requisitos
- *Node.js* (versão 14 ou superior)
- *MySQL* (para o banco de dados)

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/medconnect.git
   cd medconnect

	2.	Instale as dependências:

npm install


	3.	Configure as variáveis de ambiente. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=medconnect


	4.	Execute o script SQL para configurar o banco de dados. Isso pode ser feito via MySQL Workbench ou no terminal:

CREATE DATABASE medconnect;
USE medconnect;
-- Cole aqui o script do banco de dados fornecido anteriormente e execute


	5.	Inicie o servidor:

npm start

O servidor estará em execução no endereço http://localhost:3000.

Dependências do Projeto

	•	express: Framework para configurar rotas e gerenciar requisições HTTP.
	•	mysql2: Biblioteca para conectar o Node.js ao MySQL.
	•	dotenv: Carregar variáveis de ambiente de um arquivo .env.
	•	swagger-jsdoc e swagger-ui-express: Para documentação da API com Swagger.

Documentação da API

A documentação da API está disponível em http://localhost:3000/api-docs.

Estrutura do Banco de Dados

Tabelas

1. Hospital

Armazena informações dos hospitais.
	•	Campos: id, nome, endereco, telefone, email, cnpj, senha

2. Medico

Armazena informações dos médicos vinculados a um hospital.
	•	Campos: id, nome, crm, especialidade, senha, Hospital_id (chave estrangeira)

3. Paciente

Armazena informações dos pacientes.
	•	Campos: id, nome, cpf, endereco, telefone, email, senha

4. Consulta

Armazena informações sobre as consultas realizadas.
	•	Campos: id, data, Medico_id, Paciente_id, descricao

5. Cids

Armazena a lista de CIDs (Classificação Internacional de Doenças).
	•	Campos: id, cod, descricao

6. Atestado

Armazena atestados médicos emitidos.
	•	Campos: id, data, Medico_id, Paciente_id, Cids_id, descricao

Rotas da API

A API oferece operações CRUD para cada uma das entidades no sistema. Aqui estão as principais rotas para a entidade Hospital:
	•	GET /hospital: Retorna todos os hospitais.
	•	POST /hospital: Cria um novo hospital.
	•	PUT /hospital/:id: Atualiza um hospital pelo ID.
	•	DELETE /hospital/:id: Deleta um hospital pelo ID.

Para demais rotas e detalhes, consulte a documentação completa da API.

Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais informações.

--- 

Esse README.md cobre a instalação, configuração, e uma visão geral das rotas e estrutura do banco de dados para ajudar você a organizar e documentar o projeto.