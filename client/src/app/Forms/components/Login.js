import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ username, email, password });
  };

  const handleChange = e => {
    switch (e.target.name) {
      case 'username':
        if (e.target.value.length >= 20) {
          setErrorMessage({
            ...errorMessage,
            username: 'username must be short'
          });
        } else {
          setUsername(e.target.value);
        }
      case 'email':
        if (e.target.value.length <= 50) {
          setEmail(e.target.value);
        } else {
          setErrorMessage({ ...errorMessage, email: 'email too long' });
        }
      case 'password':
        if (e.target.value.length <= 6) {
          setErrorMessage({
            ...errorMessage,
            password: 'should be longer than 6 character'
          });
        } else {
          setPassword(e.target.value);
        }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label className='label'>Username</label>
          <div className='control has-icons-left has-icons-right'>
            <input
              onChange={handleChange}
              className='input is-success'
              type='text'
              placeholder='username'
              name='username'
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-user'></i>
            </span>
            <span className='icon is-small is-right'>
              <i className='fas fa-check'></i>
            </span>
          </div>
          <p className='help is-success'>This username is available</p>
        </div>
        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input
              onChange={handleChange}
              className='input'
              type='password'
              placeholder='password'
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
