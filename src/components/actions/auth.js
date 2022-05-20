import { getAuth, signInWithPopup } from "firebase/auth";
import { googleAuthProvider } from "../../firebase/firebase-config";
import { types } from '../../types/types';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        setTimeout(() => {
            dispatch( login(123, 'Pedro') );
        }, 3500);

    }
}

export const startGoogleLogin = () => {
    return( dispatch ) => {

        const auth = getAuth();

        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const user = result.user;
                dispatch( login(user.uid, user.displayName) );
            }).catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // const email = error.email;
                // const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})