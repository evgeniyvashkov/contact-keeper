import React, { useState, useContext, useEffect } from 'react';

import { AuthContext } from '../../context/auth/context';
import { AlertContext } from '../../context/alert/context';

export const LoginForm = (props) => {
    const { actions: { setAlert } } = useContext(AlertContext);
    const { error, isAuthenticated, actions: { loginUser, clearError } } = useContext(AuthContext);
    
    useEffect(() => {
        if (isAuthenticated) {
            console.log(1)
            props.history.push('/');
        }

        if (error !== null) {
            setAlert(error, 'danger');
            clearError();
        }
    
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (event) => setUser({
        ...user,
        [event.target.name]: event.target.value
    });

    const onSubmit = (event) => {
        event.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please, enter data into fields', 'danger')
        } else {
            loginUser({ email, password });
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange} />
                </div>

                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}
