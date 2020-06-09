import React, { useContext, useEffect } from 'react';

import { Contacts } from '../contacts/Contacts';
import { ContactForm } from '../contacts/ContactForm';
import { ContactFilter } from '../contacts/ContactFilter';
import { AuthContext } from '../../context/auth/context';

export const Home = () => {
    const { actions: { loadUser } } = useContext(AuthContext);

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}
