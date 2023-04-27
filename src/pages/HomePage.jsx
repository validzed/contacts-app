import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { getContacts, deleteContact } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => searchParams.get('search') || '');
  const firstRun = React.useRef(true);

  const { locale } = React.useContext(LocaleContext);

  const getContactsFromAPI = async () => {
    const { error, data } = await getContacts();
    if (!error) {
      setContacts(data);
    }
  };

  React.useEffect(() => {
    if (firstRun.current) {
      getContactsFromAPI();
      firstRun.current = false;
    }

    return () => {
      setKeyword('');
      setContacts(null);
    };
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteContact(id);
    getContactsFromAPI();
  };

  const onKeywordChangeHandler = (keywordValue) => {
    setKeyword(keywordValue);
    setSearchParams({ keyword: keywordValue });
  };

  const filteredContacts = contacts?.filter((contact) => contact.name.toLowerCase()
    .includes(keyword.toLowerCase()));

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contact List'}</h2>
      <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
    </section>
  );
}

export default HomePage;
