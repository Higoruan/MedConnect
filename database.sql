-- MySQL Workbench Synchronization
-- Generated: 2024-11-05 19:37
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: autologon

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS medconnect DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS medconnect.Hospital (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  endereco VARCHAR(45) NOT NULL,
  telefone VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  cnpj VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS medconnect.Medico (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    crm VARCHAR(45) NOT NULL,
    especialidade VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    Hospital_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    INDEX fk_medico_Hospital_idx (Hospital_id ASC),
    CONSTRAINT fk_medico_Hospital FOREIGN KEY (Hospital_id)
        REFERENCES medconnect.Hospital (id)
        ON DELETE NO ACTION ON UPDATE NO ACTION
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS medconnect.Paciente (
  id INT(11) NOT NULL,
  nome VARCHAR(45) NOT NULL,
  cpf VARCHAR(45) NOT NULL,
  endereco VARCHAR(45) NOT NULL,
  telefone VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS medconnect.Consulta (
  id INT(11) NOT NULL AUTO_INCREMENT,
  data TIMESTAMP NOT NULL,
  Medico_id INT(11) NOT NULL,
  Paciente_id INT(11) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Consulta_Medico1_idx (Medico_id ASC) ,
  INDEX fk_Consulta_Paciente1_idx (Paciente_id ASC) ,
  CONSTRAINT fk_Consulta_Medico1
    FOREIGN KEY (Medico_id)
    REFERENCES medconnect.Medico (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Consulta_Paciente1
    FOREIGN KEY (Paciente_id)
    REFERENCES medconnect.Paciente (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS medconnect.Cids (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nome TEXT NOT NULL,
  cod INT(11) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS medconnect.Atestado (
  id INT(11) NOT NULL AUTO_INCREMENT,
  data TIMESTAMP NOT NULL,
  Medico_id INT(11) NOT NULL,
  Paciente_id INT(11) NOT NULL,
  Cids_id INT(11) NOT NULL,
  descricao TEXT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Atestado_Medico1_idx (Medico_id ASC) ,
  INDEX fk_Atestado_Cids1_idx (Cids_id ASC) ,
  INDEX fk_Atestado_Paciente1_idx (Paciente_id ASC) ,
  CONSTRAINT fk_Atestado_Medico1
    FOREIGN KEY (Medico_id)
    REFERENCES medconnect.Medico (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Atestado_Cids1
    FOREIGN KEY (Cids_id)
    REFERENCES medconnect.Cids (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Atestado_Paciente1
    FOREIGN KEY (Paciente_id)
    REFERENCES medconnect.Paciente (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;