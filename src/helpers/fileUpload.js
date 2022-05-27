import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const fileUpload = async ( file, fileName ) => {

    const storage = getStorage();
    const storageRef = ref(storage, `journal/${fileName}`);

    try {
        const uploadTask = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(uploadTask.ref);

        return url;
        
    } catch (err) {
        console.log(err);
        throw err;
    } 

} 