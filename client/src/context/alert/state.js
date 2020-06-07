import React, { useReducer } from 'react';
import { v4 } from 'uuid';

import { AlertContext } from './context';
import { alertReducer } from './reducer';
import * as actions from '../actionTypes';

export const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const setAlert = (message, type, timeout = 5000) => {
        const id = v4();

        dispatch({
            type: actions.SET_ALERT,
            payload: { id, type, message }
        });

        setTimeout(() => {
            dispatch({
                type: actions.REMOVE_ALERT,
                payload: id
            });
        }, timeout);
    };

    return (
        <AlertContext.Provider value={{
            alerts: state,
            actions: {
                setAlert
            }
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}
