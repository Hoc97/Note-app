import { getFolders, getNote, getNotes, addNewFolder, addNewNote, updateNote } from '../services/api';

const foldersLoader = async () => {
  const query = `query Folders {
        folders {
          id
          name
          createdAt
        }
      }`;

  const res = await getFolders(query);
  console.log(res);
  return res;
};

const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String!) {
        folder(folderId: $folderId) {
          id
          name
          notes {
            content
            id
            updatedAt
          }
        }
      }`;

  const res = await getNotes(query, folderId);
  console.log(res);
  return res;
};

const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note( $noteId: String!) {
    note(noteId: $noteId) {
      id
      content
    }
  }`;

  const res = await getNote(query, noteId);
  console.log(res);
  return res;
};


const addNewFolderFunc = async (newFolder) => {
  const query = `mutation AddFolder($name: String!,$content: String) {
    addFolder( name: $name) {
      name
      author {
        name
      }
    }
    pushNotification(content: $content) {
      message
    }
  }`;

  const res = await addNewFolder(query, newFolder.name);
  console.log(res);
  return res;
};

const addNewNoteFunc = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  const query = `mutation Mutation($content: String!, $folderId: String!) {
    addNote(content: $content, folderId: $folderId) {
        id
        content
        }
      }`;

  const res = await addNewNote(query, formDataObj);
  console.log(res);
  return res;
};


const updateNoteFunc = async ({ params, request }) => {
  const updatedNote = await request.formData();
  const formDataObj = {};
  updatedNote.forEach((value, key) => (formDataObj[key] = value));
  console.log({ formDataObj });
  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
        id
        content
        }
      }`;

  const res = await updateNote(query, formDataObj);
  console.log(res);
  return res;
};

export {
  addNewFolderFunc,
  noteLoader,
  notesLoader,
  foldersLoader,
  addNewNoteFunc,
  updateNoteFunc
};