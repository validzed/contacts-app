import React from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function SearchBar({ keyword, keywordChange }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={locale === 'id' ? 'Cari berdasarkan nama' : 'Search by name'}
      value={keyword}
      onChange={(event) => keywordChange(event.target.value)}
    />
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
