import React from 'react';

export const ContactItem = ({ contact: { name, email, phone, type } }) =>
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
            <button className="btn btn-dark btn-sm">Edit</button>
            <button className="btn btn-danger btn-sm">Delete</button>
        </div>
    </div>