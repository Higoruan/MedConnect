CREATE DATABASE medconnect;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('medico', 'paciente', 'admin') NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    crm VARCHAR(20) UNIQUE NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(15),
    endereco TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE consultas (
    id SERIAL PRIMARY KEY,
    medico_id INT REFERENCES medicos(id) ON DELETE CASCADE,
    paciente_id INT REFERENCES pacientes(id) ON DELETE CASCADE,
    data_consulta TIMESTAMP NOT NULL,
    motivo TEXT NOT NULL,
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);