import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login, signout, signup, autolog } from '../../../../redux/actions';
import Form from '../../../Forms/Form';

const Auth = props => {
  const [formName, setFormName] = useState('');
  const [displayModal, setDisplayModal] = useState(false);
  ////const [displaySignout, setDisplaySignout] = useState(false);
  useEffect(() => {
    props.autolog(localStorage.getItem('access_token'));
  }, []);
  return (
    <div>
      {
        <Form
          formName={formName}
          displayModal={displayModal}
          quit={setDisplayModal}
        />
      }
      {!props.auth.authenticated ? (
        <>
          <button
            style={{ float: 'right', marginRight: '10px' }}
            className='to-left button'
            onClick={() => {
              setDisplayModal(true);
              setFormName({ type: 'signup', name: 'signup' });
            }}>
            signup
          </button>{' '}
          {'  '}
          <button
            style={{ float: 'right' }}
            className='to-left button'
            onClick={() => {
              setDisplayModal(true);
              setFormName({ type: 'login', name: 'login' });
            }}>
            login
          </button>
        </>
      ) : (
        <>
          <button
            style={{ float: 'right' }}
            className='to-left button'
            onClick={() => props.signout()}>
            signout
          </button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, signout, signup, autolog })(
  Auth
);
