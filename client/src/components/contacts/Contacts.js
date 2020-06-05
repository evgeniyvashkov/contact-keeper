import React, { useContext } from 'react'
import { ContactContext } from '../../context/contact/context';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ContactItem } from './ContactItem';

export const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const { contacts, filter } = contactContext;
    let contactsToRender;

    if (filter !== null) {
        contactsToRender = contacts.filter(contact => {
            const regExp = new RegExp(`${filter}`, 'gi');
            return regExp.test(contact.name) || regExp.test(contact.email);
        })
    } else {
        contactsToRender = contacts;
    };

    return (
        <React.Fragment>
            <TransitionGroup>
                {
                    contactsToRender.map(contact =>
                        <CSSTransition
                            key={contact.id}
                            classNames="animate-contact"
                            timeout={300}>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
        </React.Fragment>
    )
}