import * as actions from '../actionTypes';

export const contactReducer = (state, action) => {
    switch (action.type) {

        case actions.ADD_CONTACT:
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.payload
                ]
            };

        case actions.ADD_CONTACT_FAILED:
            return {
                ...state,
                error: action.payload
            };

        case actions.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
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
            };

        case actions.UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ?
                    action.payload :
                    contact)
            };

        case actions.FILTER_CONTACTS:
            return {
                ...state,
                filter: action.payload
            };

        case actions.CLEAR_FILTER:
            return {
                ...state,
                filteredContacts: null
            };

        default:
            return state;
    }
}