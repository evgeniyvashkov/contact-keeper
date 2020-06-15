import React, { useContext, useEffect } from 'react'
import { ContactContext } from '../../context/contact/context';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Spinner } from '../layout/Spinner';
import { ContactItem } from './ContactItem';

export const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filter, loading, actions: { getContacts } } = contactContext;
    let contactsToRender;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);

    if (filter !== null) {
        contactsToRender = contacts.filter(contact => {
            const regExp = new RegExp(`${filter}`, 'gi');
            return regExp.test(contact.name) || regExp.test(contact.email);
        })
    } else {
        contactsToRender = contacts;
    };

    if (contacts !== null && contacts.length === 0) {
        return <p>Please, add a new contact</p>
    }

    return (
        <React.Fragment>
            {contactsToRender && !loading ? (<TransitionGroup>
                {
                    contactsToRender.map(contact =>
                        <CSSTransition
                            key={contact._id}
                            classNames="animate-contact"
                            timeout={300}>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    )
                }
            </TransitionGroup>) : <Spinner />
            }
        </React.Fragment>

    )
}