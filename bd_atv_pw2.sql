CREATE DATABASE atv_pw2;

USE atv_pw2;

CREATE TABLE tbl_categoria(
	codigo_categoria INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(255) NOT NULL,
    observaçoes_categoria TEXT NOT NULL
);

CREATE TABLE tbl_produto(
	codigo_produto INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	codigo_categoria INT UNSIGNED NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    valor_produto DECIMAL(10, 2) NOT NULL,
    imagem_produto VARCHAR(500) NOT NULL,
    descricao_produto TEXT NOT NULL
);

# Chave estrangeira

ALTER TABLE tbl_produto ADD CONSTRAINT fk_tbl_produto_TBL_categoria FOREIGN KEY (codigo_categoria) REFERENCES tbl_categoria (codigo_categoria);

# Teste

DESCRIBE tbl_categoria;

DESCRIBE tbl_produto;





