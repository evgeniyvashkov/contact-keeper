import * as actions from '../actionTypes';

export const authReducer = (state, action) => {
    switch (action.type) {
        case actions.REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };

        case actions.REGISTER_FAILED:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: action.payload
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