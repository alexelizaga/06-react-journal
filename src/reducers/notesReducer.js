
/*
    {
        notes: [],
        active: null,
        active: {
            id: '',
            title: '',
            body: '',
            imageUrl: '',
            date: 1234
        }
    }
*/

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        default:
            return state;
    }
}