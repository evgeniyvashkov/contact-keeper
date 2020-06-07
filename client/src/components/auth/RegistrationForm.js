import React, { useState, useContext } from 'react';
import { AlertContext } from '../../context/alert/context';

export const RegistrationForm = () => {
    const { actions: { setAlert } } = useContext(AlertContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { name, email, password, confirmPassword } = user;

    const onChange = (event) => setUser({
        ...user,
        [event.target.name]: event.target.value
    });

    const onSubmit = (event) => {
        event.preventDefault();
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setAlert('Please, enter all field.', 'danger')
        } else if (password !== confirmPassword) {
            setAlert('Passwords do not match.', 'danger');
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange} />
                </div>

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
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm password</label>
                    <input
                        type="password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={onChange} />
                </div>

                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}
