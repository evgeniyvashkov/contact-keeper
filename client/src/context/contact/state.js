import React, { useReducer } from 'react';
import * as uuid from 'uuid';

import { ContactContext } from './context';
import { contactReducer } from './reducer';

import * as actions from '../actionTypes';

export const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Eugene',
                phone: '777-77-77',
                type: 'professional',
                email: '1@1gamil.com'
            },
            {
                id: 2,
                name: 'Eugene',
                phone: '777-77-77',
                type: 'personal',
                email: '1@1gamil.com'
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({
            type: actions.ADD_CONTACT,
            payload: contact
        })
    };

    const deleteContact = (id) => dispatch({ type: actions.DELETE_CONTACT, payload: id });

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            actions: {
                addContact,
                deleteContact
            }
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};
