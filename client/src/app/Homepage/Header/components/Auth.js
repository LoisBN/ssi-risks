import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login, signout, signup, autolog } from '../../../../redux/actions';
import Form from '../../../Forms/Form';

const Auth = props => {
  const [formName, setFormName] = useState('');
  const [displayModal, setDisplayModal] = useState(false);
  ////const [displaySignout, setDisplaySignout] = useState(false);
  useEffect(() => {
    console.log(props);
  });
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
            onClick={() => {
              setDisplayModal(true);
              setFormName('signup');
            }}>
            signup
          </button>
          <button
            onClick={() => {
              setDisplayModal(true);
              setFormName('login');
            }}>
            login
          </button>
        </>
      ) : (
        <>
          <button onClick={() => localStorage.removeItem('access_token')}>
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
