import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch( startLoading() );

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch( login(user.uid, user.displayName) );
                dispatch( finishLoading() );
            }).catch( err => {
                console.log(err);
            })

    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return ( dispatch ) => {
        dispatch( startLoading() );

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then( async({ user }) => {
                await updateProfile(auth.currentUser, {
                    displayName: name
                });
                dispatch( login(user.uid, user.displayName) );
                dispatch( finishLoading() );
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
});

export const startLogout = () => {
    return async ( dispatch ) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch( logout() );
    }
};

export const logout = () => ({
    type: types.logout
});