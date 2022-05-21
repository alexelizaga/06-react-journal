import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

export const store = configureStore({
    reducer,
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //         thunk: {
    //             // extraArgument: myCustomApiService
    //         }
    //     })
});