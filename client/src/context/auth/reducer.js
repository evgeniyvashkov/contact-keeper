import * as actions from '../actionTypes';

export const authReducer = (state, action) => {
    switch (action.type) {

        case actions.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }

        case actions.REGISTER_SUCCESS:
        case actions.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };

        case actions.REGISTER_FAILED:
        case actions.AUTH_ERROR:
        case actions.LOGIN_FAILED:
        case actions.LOG_OUT:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: action.payload || null
            };

        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}