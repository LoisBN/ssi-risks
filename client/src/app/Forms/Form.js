import React from 'react';
import Identification from './components/Identification';
import BesoinSec from './components/BesoinSec';
import Signup from './components/Signup';
import Login from './components/Login';

const Form = props => {
  const renderForm = formName => {
    switch (formName) {
      case 'identification':
        return <Identification />;
      case 'besoin sécurité':
        return <BesoinSec />;
      case 'identification':
        return <Identification />;
      case 'signup':
        return <Signup />;
      case 'login':
        return <Login />;
      default:
        break;
    }
  };
  return (
    <>
      <div
        className={props.displayModal === true ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={props.quit}>
          <div className='modal-card' onClick={e => e.stopPropagation()}>
            <div className='modal-card'>
              <header className='modal-card-head'>
                <p className='modal-card-title'>{props.formName}</p>
                <button
                  className='delete'
                  aria-label='close'
                  onClick={props.quit}></button>
              </header>
              <section className='modal-card-body'>
                {renderForm(props.formName)}
              </section>
              <footer className='modal-card-foot'>
                <button type='submit' className='button is-success'>
                  Submit
                </button>
                <button type='reset' className='button'>
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
