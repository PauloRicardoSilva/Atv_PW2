const {initializeApp} = require('firebase/app');
const {getStorage, ref, deleteObject} = require('firebase/storage');

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