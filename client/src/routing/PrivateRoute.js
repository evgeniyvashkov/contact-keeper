import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth/context';

export const PrivateRoute = ({ component: RouterComponent, ...rest }) => {
    const { loading, isAuthenticated } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps =>
                !isAuthenticated && !loading ?
                    <Redirect to="/login" /> :
                    <RouterComponent {...routeProps} />
            }
        />
    )
}
