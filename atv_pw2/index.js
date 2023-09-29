const express = require("express");

const app = express();

const ProdutoController = require("./controller/ProdutoController");

const CategoriaController = require("./controller/CategoriaController");

app.use(express.json(), ProdutoController, CategoriaController);

app.use(express.urlencoded({extended:true}));

app.listen(3000, ()=>{
    console.group ('API rodando em http://localhost:3000')
})