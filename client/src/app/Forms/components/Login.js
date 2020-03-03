import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    username: '',
    password: ''
  });

  const submit = useRef();

  useEffect(() => {
    if (props.auth.authenticated) {
      props.quit();
    }
  }, [props]);

  useEffect(() => {
    if (props.send) {
      submit.current.click();
      props.setSend(false);
    }
  }, [props.send]);

  const handleSubmit = e => {
    e.preventDefault();
    props.login({ identifier: username, password });
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
        break;
      case 'password':
        if (e.target.value.length <= 6) {
          setPassword(e.target.value);
          setErrorMessage({
            ...errorMessage,
            password: 'should be longer than 6 character'
          });
        } else {
          setPassword(e.target.value);
          setErrorMessage({
            ...errorMessage,
            password: ''
          });
        }
        break;
      default:
        break;
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
              className='input'
              required
              type='text'
              placeholder='username'
              name='username'
              value={username}
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-user'></i>
            </span>
            <span className='icon is-small is-right'>
              <i className='fas fa-check'></i>
            </span>
          </div>
          <p className='help is-danger'>{errorMessage.username}</p>
        </div>
        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input
              onChange={handleChange}
              required
              className='input'
              type='password'
              placeholder='password'
              name='password'
              value={password}
            />
          </div>
          <p className='help is-danger'>{errorMessage.password}</p>
        </div>
        <input style={{ display: 'none' }} ref={submit} type='submit'></input>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
