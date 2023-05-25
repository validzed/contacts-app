import React from 'react';
import ContactList from './ContactList';
import ContactInput from './ContactInput';
import { getData } from '../utils/data';

function ContactApp() {
  const [contacts, setContacts] = React.useState(() => getData());

  const onDeleteHandler = (id) => {
    const contactResults = contacts.filter((contact) => contact.id !== id);
    setContacts(contactResults);
  }

  const onAddContactHandler = ({ name, tag }) => {
    setContacts([
      ...contacts,
      {
        id: +new Date(),
        name,
        tag,
        imageUrl: '/images/default.jpg',
      }
    ]);
  }

  return (
    <div className="contact-app">
      <h1>Aplikasi Kontak</h1>
      <h2>Tambah Kontak</h2>
      <ContactInput addContact={onAddContactHandler} />
      <h1>Daftar Kontak</h1>
      <ContactList contacts={contacts} onDelete={onDeleteHandler} />
    </div>
  );
}

export default ContactApp;
