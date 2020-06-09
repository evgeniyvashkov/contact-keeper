import React, { useState, useContext, useEffect } from 'react';
import { ContactContext } from '../../context/contact/context';

export const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { contactToEdit,
        actions: { clearContactToEdit, addContact, updateContact } } = contactContext;

    const initialState = {
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    };

    useEffect(() => {
        contactToEdit !== null ?
            setContact(contactToEdit) :
            setContact(initialState);
        //eslint-disable-next-line
    }, [contactToEdit]);

    const [contact, setContact] = useState(initialState);

    const onChange = ({ target: { name, value } }) => setContact({ ...contact, [name]: value });

    const onSubmit = (event) => {
        event.preventDefault();
        if (contactToEdit) {
            updateContact(contact);
        } else {
            addContact(contact);
        }

        setContact(initialState);
    }

    const { name, email, phone, type } = contact;
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{`${contactToEdit ? 'Update' : 'Add'} Contact`}</h2>
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
                    value={`${contactToEdit ? 'Update' : 'Add'} Contact`} />

                {contactToEdit &&
                    <input
                        type="button"
                        className="btn btn-light btn-block"
                        value="Clear form"
                        onClick={clearContactToEdit}
                    />}
            </div>
        </form>
    )
}
