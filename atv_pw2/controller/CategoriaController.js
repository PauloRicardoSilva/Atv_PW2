const express = require('express');

const router = express.Router();

router.post ('/cadastrarCategoria', (req, res)=>{
    res.send("Categoria cadastrada com sucesso")
});

router.get ('/listarCategoria', (req, res)=>{
    res.send("Categoria listada com sucesso")
});

router.put ('/alterarCategoria', (req, res)=>{
    res.send("Categoria alterada com sucesso")
});

router.delete ('/excluirCategoria', (req, res)=>{
    res.send("Categoria excluída com sucesso")
});

module.exports = router;