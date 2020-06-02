import React, { useReducer } from 'react';
import uuid from 'uuid';

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

    return (
        <ContactContext.Provider value={{ contacts: state.contacts }}>
            {props.children}
        </ContactContext.Provider>
    )
};
