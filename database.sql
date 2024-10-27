CREATE DATABASE medconnect;

-- Tabela de usuários para armazenar informações gerais de cada pessoa cadastrada
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,          -- Nome do usuário
    email VARCHAR(255) UNIQUE NOT NULL,   -- E-mail do usuário, deve ser único
    password VARCHAR(255) NOT NULL,       -- Senha do usuário
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de criação do registro
);

-- Tabela de médicos, vinculada à tabela de usuários, para armazenar detalhes médicos
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- ID do usuário (referência)
    license_number VARCHAR(20) UNIQUE NOT NULL,         -- Número de licença (CRM)
    specialty VARCHAR(100) NOT NULL,                    -- Especialidade médica
    phone VARCHAR(15),                                  -- Telefone do médico
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP        -- Data de criação do registro
);

-- Tabela de pacientes, vinculada à tabela de usuários, para armazenar informações do paciente
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- ID do usuário (referência)
    birth_date DATE NOT NULL,                           -- Data de nascimento do paciente
    phone VARCHAR(15),                                  -- Telefone do paciente
    address TEXT,                                       -- Endereço do paciente
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP        -- Data de criação do registro
);

-- Tabela de consultas para registrar as informações de cada consulta médica
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE, -- ID do médico (referência)
    patient_id INT REFERENCES patients(id) ON DELETE CASCADE, -- ID do paciente (referência)
    appointment_date TIMESTAMP NOT NULL,                   -- Data e hora da consulta
    reason TEXT NOT NULL,                                  -- Motivo da consulta
    notes TEXT,                                            -- Observações adicionais
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP           -- Data de criação do registro
);