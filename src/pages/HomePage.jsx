import React from 'react';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { getContacts, deleteContact } from '../utils/api';
import { useSearchParams } from 'react-router-dom';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');

  const changeSearchParams = (search) => {
    setSearchParams({ search });
  };

  const [contacts, setContacts] = React.useState([]);
  const [keyword, setKeyword] = React.useState(search || '');

  React.useEffect(() => {
    getContactsFromAPI();

    return () => {
      setKeyword('');
      setContacts(null);
    }
  }, []);

  const getContactsFromAPI = async () => {
    const { error, data } = await getContacts();
    if (!error) {
      setContacts(data);
    }
  }

  const onDeleteHandler = async (id) => {
    await deleteContact(id);
    getContactsFromAPI();
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
