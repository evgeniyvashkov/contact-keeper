import * as actions from '../actionTypes';

export const contactReducer = (state, action) => {
    switch (action.type) {
        case actions.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };


        case actions.ADD_CONTACT:
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.payload
                ]
            };

        case actions.SET_CURRENT:
            return {
                ...state,
                contactToEdit: action.payload
            };

        case actions.CLEAR_CURRENT:
            return {
                ...state,
                contactToEdit: null
            }

        default:
            return state;
    }
}