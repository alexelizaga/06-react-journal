import { deleteObject, getStorage, ref } from 'firebase/storage';

export const fileDelete = async ( fileName ) => {

    const storage = getStorage();
    const storageRef = ref(storage, `journal/${fileName}`);

    try {
        await deleteObject(storageRef);
    } catch (err) {
        console.log(err);
        throw err;
    }

}