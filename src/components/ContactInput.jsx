import React from 'react';
import PropTypes from 'prop-types';

function ContactInput({ addContact }) {
  const [name, setName] = React.useState('');
  const [tag, setTag] = React.useState('');

  const onNameChangeHandler = (event) => {
    setName((prevName) => {
      return event.target.value;
    });
  };

  const onTagChangeHandler = (event) => {
    setTag(event.target.value);
  };

  const onSubmitEventHandler = (event) => {
    event.preventDefault();
    addContact({ name, tag });
  };

  return (
    <form className="contact-input" onSubmit={onSubmitEventHandler}>
      <input
        type="text"
        name="nama"
        placeholder="Nama"
        value={name}
        onChange={onNameChangeHandler}
      />
      <input type="text" name="tag" placeholder="Tag" value={tag} onChange={onTagChangeHandler} />
      <button type="submit">Tambah</button>
    </form>
  );
}

ContactInput.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactInput;
