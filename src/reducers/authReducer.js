import { types } from '../types/types';

// {
//     uid: jhñosdhbcoñabcfa
//     name: 'Alex'
// }

export const authReducer = ( state = {}, action ) => {

    switch( action.type ) {
        case types.authLogin:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.authLogout:
            return {}
        default:
            return state;
    }

}