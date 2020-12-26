CREATE DATABASE usuarioDB;
use usuarioDB;
CREATE TABLE usuario(
  id INTEGER NOT NULL AUTO_INCREMENT,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  administrador TINYINT(1) NOT NULL,

  PRIMARY KEY (id)
);

INSERT INTO usuario(nombres, apellidos, email, password, administrador)
VALUES ('admin', 'admin', 'admin@gmail.com', '1234', 1);