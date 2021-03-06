import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { fileDelete } from '../helpers/fileDelete';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const doc = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);

        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );

    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if ( !note.url ) {
            delete note.url;
        }

        if ( !note.format ) {
            delete note.format;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteDoc = doc(db, `${uid}/journal/notes/${ note.id }`);
        await updateDoc(noteDoc, noteToFirestore);

        console.log('noteToFirestore', noteToFirestore);

        dispatch( refreshNote(note.id, noteToFirestore) );
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })
        const fileFormat = file.name.substring(file.name.lastIndexOf('.'));
        const fileUrl = await fileUpload( file, activeNote.id + fileFormat );
        const updateNote = {
            ...activeNote,
            url: fileUrl,
            format: fileFormat
        }

        dispatch( startSaveNote(updateNote) );

        Swal.close();
    }
}

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        const { active: activeNote } = getState().notes;
        const noteDoc = doc(db, `${uid}/journal/notes/${ id }`);
        await deleteDoc(noteDoc);
        await fileDelete(id + activeNote.format);

        dispatch( deleteNote(id) );
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})
