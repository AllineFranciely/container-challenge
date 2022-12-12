CREATE DATABASE IF NOT EXISTS containers_test_api;

USE containers_test_api;

CREATE TABLE
    IF NOT EXISTS containers (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        cliente VARCHAR(50) NOT NULL,
        numero VARCHAR(11),
        tipo INT NOT NULL,
        situacao VARCHAR(50) NOT NULL,
        categoria VARCHAR (50) NOT NULL
    );

INSERT INTO
    containers (
        cliente,
        numero,
        tipo,
        situacao,
        categoria
    )
VALUES (
        'Empresa1',
        'test0123456',
        20,
        'Cheio',
        'Importação'
    ), (
        'Empresa2',
        'test1234567',
        40,
        'Vazio',
        'Exportação'
    );
