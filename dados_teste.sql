-- Inserts para a tabela Hospital
INSERT INTO
    medconnect.Hospital (nome, endereco, telefone, email, cnpj, senha)
VALUES
    (
        'Hospital São José',
        'Rua A, 123',
        '1122334455',
        'sjose@hospital.com',
        '12345678000101',
        'senha123'
    ),
    (
        'Hospital Santa Maria',
        'Avenida B, 456',
        '2233445566',
        'smaria@hospital.com',
        '98765432000110',
        'senha123'
    ),
    (
        'Hospital Vida',
        'Praça C, 789',
        '3344556677',
        'vida@hospital.com',
        '45678912000122',
        'senha123'
    );

-- Inserts para a tabela Medico
INSERT INTO
    medconnect.Medico (nome, crm, especialidade, senha, Hospital_id)
VALUES
    (
        'Dr. João Silva',
        'CRM12345',
        'Cardiologia',
        'senha123',
        1
    ),
    (
        'Dr. Ana Paula',
        'CRM67890',
        'Pediatria',
        'senha123',
        2
    ),
    (
        'Dra. Carlos Santos',
        'CRM54321',
        'Ortopedia',
        'senha123',
        3
    );

-- Inserts para a tabela Paciente
INSERT INTO
    medconnect.Paciente (id, nome, cpf, endereco, telefone, email, senha)
VALUES
    (
        1,
        'Carlos Ferreira',
        '12345678901',
        'Rua D, 100',
        '1234567890',
        'carlos@paciente.com',
        'senha123'
    ),
    (
        2,
        'Mariana Lima',
        '98765432100',
        'Rua E, 200',
        '0987654321',
        'mariana@paciente.com',
        'senha123'
    ),
    (
        3,
        'José Santos',
        '45612378909',
        'Rua F, 300',
        '9123456789',
        'jose@paciente.com',
        'senha123'
    );

-- Inserts para a tabela Cids
INSERT INTO
    medconnect.Cids (nome, cod, descricao)
VALUES
    (
        'Diabetes Mellitus',
        250,
        'Doença crônica caracterizada por altos níveis de glicose no sangue.'
    ),
    (
        'Hipertensão Arterial',
        401,
        'Pressão arterial elevada de forma persistente.'
    ),
    (
        'Fratura do Fêmur',
        820,
        'Ruptura do osso fêmur, geralmente causada por trauma.'
    );

-- Inserts para a tabela Consulta
INSERT INTO
    medconnect.Consulta (data, Medico_id, Paciente_id, descricao)
VALUES
    (
        '2024-12-01 10:00:00',
        1,
        1,
        'Consulta de rotina para avaliação de pressão arterial.'
    ),
    (
        '2024-12-02 11:00:00',
        2,
        2,
        'Consulta pediátrica de retorno.'
    ),
    (
        '2024-12-03 14:00:00',
        3,
        3,
        'Avaliação de recuperação após cirurgia ortopédica.'
    );

-- Inserts para a tabela Atestado
INSERT INTO
    medconnect.Atestado (data, Medico_id, Paciente_id, Cids_id, descricao)
VALUES
    (
        '2024-12-01 10:30:00',
        1,
        1,
        2,
        'Paciente deve permanecer afastado por 7 dias devido à hipertensão descontrolada.'
    ),
    (
        '2024-12-02 12:00:00',
        2,
        2,
        1,
        'Paciente afastado por 3 dias devido à descompensação diabética.'
    ),
    (
        '2024-12-03 15:00:00',
        3,
        3,
        3,
        'Paciente com recomendação de 30 dias de repouso pós-cirurgia no fêmur.'
    );