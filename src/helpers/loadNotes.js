import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase/firebase-config';

export const loadNotes = async ( uid ) => {
    const notes = [];

    const notesSnap = await getDocs(collection(db, `${uid}/journal/notes/`));
    notesSnap.forEach(( doc ) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        console.log( doc.id, doc.data() );
        notes.push({
            id: doc.id,
            ...doc.data()
        })
    });

    return notes;
}