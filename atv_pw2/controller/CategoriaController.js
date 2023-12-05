const express = require("express");

const categoriaModel = require("../model/Categoria");

const router = express.Router();

router.post ("/cadastrarCategoria", (req, res) => {

    const {nome_categoria, observacoes_categoria} = req.body;

    categoriaModel.create({nome_categoria, observacoes_categoria})
    .then(
        () => {
            return res.status(200).json({
                errorStatus: false,
                messageStatus: "Categoria inserida com sucesso"
            });
        }
    )
    .catch(
        (error) => {
            return res.status(400).json({
                errorStatus: true,
                messageStatus: "Falha ao inserir categoria " + error
            });
        }
    );
});

router.get ('/listarCategoria', (req, res) => {
    
    categoriaModel.findAll()
    .then(
        (categorias) => {
            return res.status(200).json(
                categorias
            );
        }
    )
    .catch(
        (error) => {
            return res.status(400).json({
                errorStatus: true,
                messageStatus: "Falha ao listar categorias " + error
            });
        }
    )
});

router.put ('/alterarCategoria', (req, res) => {
    
    const {codigo_categoria, nome_categoria, observacoes_categoria} = req.body;

    categoriaModel.update(
        {nome_categoria, observacoes_categoria},
        {where:{codigo_categoria}}
    )
    .then(
        () => {
            return res.status(200).json({
                errorStatus: false,
                messageStatus: "Categoria alterada com sucesso"
            });
        }
    )
    .catch(
        (error) => {
            return res.status(400).json({
                errorStatus: true,
                messageStatus: "Falha ao alterar categoria " + error
            })
        }
    )
});

router.delete ('/excluirCategoria/:codigo_categoria', (req, res) => {
    
    const {codigo_categoria} = req.params;

    categoriaModel.destroy(
        {where:{codigo_categoria}}
    )
    .then(
        () => {
            return res.status(200).json({
                errorStatus: false,
                messageStatus: "Categoria excluída com sucesso"
            });
        }
    )
    .catch(
        (error) => {
            return res.status(400).json({
                errorStatus: true,
                messageStatus: "Falha ao excluir categoria " + error
            })
        }
    )
});

module.exports = router;