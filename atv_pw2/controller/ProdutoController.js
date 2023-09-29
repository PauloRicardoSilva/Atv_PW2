const express = require('express');

const router = express.Router();

router.post ('/cadastrarProduto', (req, res)=>{
    res.send("Produto cadastrado com sucesso")
});

router.get ('/listarProduto', (req, res)=>{
    res.send("Produto listado com sucesso")
});

router.put ('/alterarProduto', (req, res)=>{
    res.send("Produto alterado com sucesso")
});

router.delete ('/excluirProduto', (req, res)=>{
    res.send("Produto excluído com sucesso")
});

module.exports = router;