import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth/context';
import { ContactContext } from '../../context/contact/context';

export const Navbar = ({ title = 'Contact Keeper', icon = 'fas fa-id-card-alt' }) => {
    const { user, isAuthenticated, actions: { logoutUser } } = useContext(AuthContext);
    const { actions: { clearContacts } } = useContext(ContactContext);

    const onLogoutUser = () => {
        logoutUser();
        clearContacts();
    }

    const authLink = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href="#!" onClick={onLogoutUser}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hie-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Registration</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />{title}
            </h1>
            <ul>
                {isAuthenticated ? authLink : guestLinks}
            </ul>
        </div>
    )
}
