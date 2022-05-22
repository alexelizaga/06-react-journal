import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase/firebase-config';

export const loadNotes = async ( uid ) => {
    const notes = [];

    const notesSnap = await getDocs(collection(db, `${uid}/journal/notes/`));
    notesSnap.forEach(( doc ) => {
        notes.push({
            id: doc.id,
            ...doc.data()
        })
    });

    return notes;
}