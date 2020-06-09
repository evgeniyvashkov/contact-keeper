import React, { useReducer } from 'react';
import axios from 'axios';

import { ContactContext } from './context';
import { contactReducer } from './reducer';

import * as actions from '../actionTypes';

export const ContactState = (props) => {
    const initialState = {
        contacts: [],
        contactToEdit: null,
        filter: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: actions.ADD_CONTACT,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: actions.ADD_CONTACT_FAILED,
                payload: error.response.message
            })
        }

    };

    const deleteContact = (id) => dispatch({ type: actions.DELETE_CONTACT, payload: id });

    const setContactToEdit = (contact) => {
        dispatch({
            type: actions.SET_CURRENT,
            payload: contact
        })
    };

    const clearContactToEdit = () => dispatch({
        type: actions.CLEAR_CURRENT
    });

    const updateContact = (contact) => dispatch({
        type: actions.UPDATE_CONTACT,
        payload: contact
    });

    const setFilter = (text) => dispatch({
        type: actions.FILTER_CONTACTS,
        payload: text
    });

    const clearFilter = () => dispatch({
        type: actions.CLEAR_FILTER
    })

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            actions: {
                addContact,
                deleteContact,
                setContactToEdit,
                clearContactToEdit,
                updateContact,
                setFilter,
                clearFilter
            },
            contactToEdit: state.contactToEdit,
            filter: state.filter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};
