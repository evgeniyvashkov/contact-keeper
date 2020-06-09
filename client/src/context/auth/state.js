import React, { useReducer } from 'react';
import axios from 'axios';
import { setAuthToken } from '../../utils/setAuthToken';

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

    const registerUser = async (user) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', user, config);
            dispatch({
                type: actions.REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();

        } catch (error) {
            dispatch({
                type: actions.REGISTER_FAILED,
                payload: error.response.data.message
            });
        }
    };

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: actions.USER_LOADED,
                payload: res.data
            });

        } catch (error) {
            dispatch({ type: actions.AUTH_ERROR })
        }
    }

    const loginUser = async (user) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/auth', user, config);
            dispatch({
                type: actions.LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();

        } catch (error) {
            dispatch({
                type: actions.LOGIN_FAILED,
                payload: error.response.data.message || error.response.data.errors[0].msg
            });
        }
    };

    const logoutUser = () => console.log('logout');

    const clearError = () => dispatch({ type: actions.CLEAR_ERRORS })

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error,
            actions: {
                registerUser,
                clearError,
                loadUser,
                loginUser,
                logoutUser
            }
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}