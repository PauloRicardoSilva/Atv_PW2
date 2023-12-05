const express = require('express');

const {initializeApp} = require('firebase/app');
const {getStorage, ref, getDownloadURL, uploadBytes} = require('firebase/storage');

const router = express.Router();

const produtoModel = require("../model/Produto");
const upload = require("../helpers/upload/uploadimagem")
const deleteImage = require("../helpers/upload/deleteimagem");

const firebaseConfig = {

};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

router.post ('/cadastrarProduto', upload.single('file'), (req, res)=>{

    const {nome_produto, valor_produto, descricao_produto, codigo_categoria} = req.body;
    let imagem_produto;
    let imagem_produto_url;

    const fileName = Date.now().toString() + "-" + req.file.originalname;
    const fileRef = ref(storage, fileName);

    uploadBytes(fileRef, req.file.buffer)
        .then((snapshot) => {
            imageRef = ref(storage, snapshot.metadata.name);
            getDownloadURL(imageRef)
                .then(
                    (urlFinal => {
                        imagem_produto = fileName,
                        imagem_produto_url = urlFinal
                        if(imagem_produto){
                            produtoModel.create({
                                nome_produto,
                                valor_produto,
                                imagem_produto,
                                imagem_produto_url,
                                descricao_produto,
                                codigo_categoria
                            })
                                .then(
                                    () => {
                                        return res.status(200).json({
                                            errorStatus: false,
                                            messageStatus: "Produto inserido com sucesso"
                                        });
                                    }
                                )
                                .catch(
                                    (error) => {
                                        return res.status(400).json({
                                            errorStatus: true,
                                            messageStatus: "Falha ao inserir produto " + error
                                        });
                                    }
                                );
                        };
                    })

                )
                .catch(
                    (erro) => {
                        return res.send("Erro: " + erro);
                    }
                )

        });
});

router.get ('/listarProduto', (req, res)=> {
    
    produtoModel.findAll()
        .then(
            (produtos) => {
                return res.status(200).json(
                    produtos
                )
            }
        )
        .catch(
            (error) => {
                return res.status(400).json({
                    errorStatus: true,
                    messageStatus: "Falha ao listar produtos " + error
                });

            }
        );
});

router.delete ('/excluirProduto/:codigo_produto', (req, res) => {
    
    const {codigo_produto} = req.params;

    produtoModel.findByPk(codigo_produto)
        .then(
            (produto) => {
                deleteImage(produto.imagem_produto)
                produto.destroy({
                    where: {codigo_produto}
                })
                .then(
                    () => {
                        return res.status(200).json({
                            errorStatus: false,
                            messageStatus: "Produto excluído com sucesso"
                        });
                    }
                )
                .catch(
                    (error) => {
                        return res.status(400).json({
                            errorStatus: true,
                            messageStatus: "Falha ao excluir livro " + error
                        });
                    }
                );
            }
        );
});

module.exports = router;