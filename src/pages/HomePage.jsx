import React from 'react';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { deleteContact, getContacts } from '../utils/data';
import { useSearchParams } from 'react-router-dom';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');

  const changeSearchParams = (search) => {
    setSearchParams({ search });
  };

  const [contacts, setContacts] = React.useState(() => getContacts());
  const [keyword, setKeyword] = React.useState(search || '');

  const onDeleteHandler = (id) => {
    deleteContact(id);
    setContacts(getContacts());
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    changeSearchParams(keyword);
  };

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>Daftar Kontak</h2>
      <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
    </section>
  );
}

export default HomePage;
