import React, { useReducer } from 'react';

import { authReducer } from './reducer';
import { AuthContext } from './context';

import * as actions from '../actionTypes';

export const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token') || '',
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}