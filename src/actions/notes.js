import { collection, addDoc } from "firebase/firestore";

import { db } from "../firebase/firebase-config";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        // const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        // console.log(doc);

        const docRef = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);
        console.log("Document written with ID: ", docRef.id);

    }
}
