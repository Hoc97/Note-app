import axios from '../utils/axios-customize';

const postLogin = (query, uid, displayName) => {
    return axios.post('/graphql', { query, variables: { uid, name: displayName } });
};

const getFolders = (query) => {
    return axios.post('/graphql', { query });
};

const getNotes = (query, folderId) => {
    return axios.post('/graphql', { query, variables: { folderId } });
};

const getNote = (query, noteId) => {
    return axios.post('/graphql', { query, variables: { noteId } });
};

const addNewFolder = (query, name) => {
    return axios.post('/graphql', { query, variables: { name } });
};

const addNewNote = (query, formDataObj) => {
    return axios.post('/graphql', { query, variables: formDataObj });
};

const updateNote = (query, formDataObj) => {
    return axios.post('/graphql', { query, variables: formDataObj });
};


export {
    getFolders,
    getNotes,
    getNote,
    postLogin,
    addNewFolder,
    addNewNote,
    updateNote
};