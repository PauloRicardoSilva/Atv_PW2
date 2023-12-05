const express = require('express');

const {initializeApp} = require('firebase/app');
const {getStorage, ref, getDownloadURL, uploadBytes} = require('firebase/storage');

const router = express.Router();

const produtoModel = require("../model/Produto");
const upload = require("../helpers/upload/uploadimagem")
const deleteImage = require("../helpers/upload/deleteimagem");

const firebaseConfig = {
    apiKey: "AIzaSyBjoNiVCxb17MVao7QNEGgVRVG6SN_FN4I",
    authDomain: "testepw2-4ce4e.firebaseapp.com",
    projectId: "testepw2-4ce4e",
    storageBucket: "testepw2-4ce4e.appspot.com",
    messagingSenderId: "136119857471",
    appId: "1:136119857471:web:509f5fae9acaac3f8ca38a",
    measurementId: "G-JBWDNDJTLQ"
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