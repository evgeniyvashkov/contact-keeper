import React, { useRef, useContext } from 'react'

import { ContactContext } from '../../context/contact/context';

export const ContactFilter = () => {
    const text = useRef('');
    const contactContext = useContext(ContactContext);
    const { actions: { setFilter, clearFilter } } = contactContext;

    const onChange = (event) => {
        text.current.value !== null ?
            setFilter(event.target.value) :
            clearFilter();
    };

    return (
        <form>
            <input
                ref={text}
                type="text"
                onChange={onChange}
                placeholder="Filter Contacts" />
        </form>
    )
}
