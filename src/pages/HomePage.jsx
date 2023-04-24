import React from 'react';
import ContactList from '../components/ContactList';
import { deleteContact, getContacts } from '../utils/data';

function HomePage() {
  const [contacts, setContacts] = React.useState(() => getContacts());

  const onDeleteHandler = (id) => {
    deleteContact(id);

    setContacts(getContacts());
  }

  return (
    <section>
      <h2>Daftar Kontak</h2>
      <ContactList contacts={contacts} onDelete={onDeleteHandler} />
    </section>
  )
}

export default HomePage;
