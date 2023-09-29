const sequelize = require("sequelize");

const connection = require("../database/database");

const Produto = connection.define(
    'tbl_produto',
    {
        codigo_produto:{
            type: sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true },

        codigo_categoria:{
            type: sequelize.INTEGER.UNSIGNED,
            allowNull: false },

        nome_produto:{
            type: sequelize.STRING(255),
            allowNull: false },

        valor_produto:{
            type: sequelize.DECIMAL(10, 2),
            allowNull: false },

        imagem_produto:{
            type: sequelize.STRING(500),
            allowNull: false },

        observacoes_categoria:{
            type: sequelize.TEXT,
            allowNull: false }
        
    }
)

Produto.sync({force:false});

module.exports = Produto;