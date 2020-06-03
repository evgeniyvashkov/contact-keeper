import React, { useContext } from 'react';
import { ContactContext } from '../../context/contact/context';

export const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { id, name, email, phone, type } = contact;
    const { deleteContact, setContactToEdit } = contactContext.actions;

    // const onDelete = () => deleteContact(id);

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}
                <span style={{ float: 'right' }}
                    className={`badge badge-${type === 'professional' ? "success" : "primary"}`}
                >{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </h3>
            <ul className="list">
                {email &&
                    <li>
                        <i className="fas fa-envelope-open" />
                        {email}
                    </li>
                }

                {phone &&
                    <li>
                        <i className="fas fa-phone" />
                        {phone}
                    </li>
                }
            </ul>

            <div>
                <button
                    className="btn btn-dark btn-sm"
                    onClick={() => setContactToEdit(contact)}
                >Edit</button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteContact(id)}
                >Delete</button>
            </div>
        </div>
    )
}
