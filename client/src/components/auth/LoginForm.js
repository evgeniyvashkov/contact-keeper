import React, { useState } from 'react'

export const LoginForm = () => {
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
        console.log('Login submit')
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
