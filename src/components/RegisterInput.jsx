import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="register-input">
      <input type="text" placeholder="Nama" value={name} onChange={handleNameChange} />
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
