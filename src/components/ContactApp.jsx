import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { putAccessToken, getUserLogged } from '../utils/api';
import { LocaleProvider } from '../contexts/LocaleContext';

function ContactApp() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState(localStorage.getItem('locale') || 'id');
  const firstRun = React.useRef(true);

  React.useEffect(() => {
    if (firstRun.current) {
      getUserLogged().then(({ error, data }) => {
        if (!error) {
          setAuthedUser(data);
        }
        setInitializing(false);
      });
      firstRun.current = false;
    }

    return () => {
      setAuthedUser(null);
      setInitializing(true);
    };
  }, []);

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const localeContextValue = React.useMemo(() => ({
    locale,
    toggleLocale,
  }), [locale]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    return setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleProvider value={localeContextValue}>
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>Aplikasi Kontak</h1>
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider value={localeContextValue}>
      <div className="contact-app">
        <header className="contact-app__header">
          <h1>{locale === 'id' ? 'Aplikasi Kontak' : 'Contact App'}</h1>
          <Navigation name={authedUser.name} logout={onLogout} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
          </Routes>
        </main>
      </div>
    </LocaleProvider>
  );
}

export default ContactApp;
