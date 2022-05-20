import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { googleAuthProvider } from "../../firebase/firebase-config";
import { types } from '../../types/types';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch( login(user.uid, user.displayName) );
            }).catch( err => {
                console.log(err);
            })

    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return ( dispatch ) => {

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then( async({ user }) => {
                await updateProfile(auth.currentUser, {
                    displayName: name
                });
                dispatch( login(user.uid, user.displayName) );
            }).catch( err => {
                console.log(err);
            })

    }
}

export const startGoogleLogin = () => {
    return( dispatch ) => {

        const auth = getAuth();

        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch( login(user.uid, user.displayName) );
            }).catch((error) => {
                console.log(error);
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