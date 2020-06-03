import React, { useState, useContext } from 'react';
import { ContactContext } from '../../context/contact/context';

export const ContactForm = () => {
    const contactContext = useContext(ContactContext)

    const initialState = {
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    }
    const [contact, setContact] = useState(initialState);

    const onChange = ({ target: { name, value } }) => setContact({ ...contact, [name]: value });

    const onSubmit = (event) => {
        event.preventDefault();
        contactContext.actions.addContact(contact);
        setContact(initialState);
    }

    const { name, email, phone, type } = contact;
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add Contact</h2>
            <input
                name="name"
                placeholder="Name"
                type="text"
                onChange={onChange}
                value={name} />
            <input
                name="email"
                placeholder="Email"
                type="text"
                onChange={onChange}
                value={email} />
            <input
                name="phone"
                placeholder="Phone"
                type="text"
                onChange={onChange}
                value={phone} />
            <input
                type="radio"
                value="personal"
                name="type"
                checked={type === "personal"}
                onChange={onChange} />Personal {"  "}
            <input
                type="radio"
                value="professional"
                name="type"
                checked={type === "professional"}
                onChange={onChange} />Professional
            <div>
                <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    value="Add Contact" />
            </div>
        </form>
    )
}
