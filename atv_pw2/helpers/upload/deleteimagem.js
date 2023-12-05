const {initializeApp} = require('firebase/app');
const {getStorage, ref, deleteObject} = require('firebase/storage');

const firebaseConfig = {

};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const deleteImage = (imagem) => {

    const deleteRef = ref(storage, imagem);

    deleteObject(deleteRef)
    .then(
        () => {
            console.log("Imagem excluída com sucesso")
        }
    )
    .catch(
        (error) => {
            console.log("Falha ao excluir imagem " + error)
        }
    );
};

module.exports = deleteImage;