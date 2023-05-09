import React from 'react';
import ContactList from './ContactList';
import { getData } from '../utils/data';

function ContactApp() {
  const [contacts, setContacts] = React.useState(() => getData());

  const onDeleteHandler = (id) => {
    const contactResults = contacts.filter((contact) => contact.id !== id);
    setContacts(contactResults);
  }

  return (
    <div className="contact-app">
      <h1>Daftar Kontak</h1>
      <ContactList contacts={contacts} onDelete={onDeleteHandler} />
    </div>
  );
}

export default ContactApp;
