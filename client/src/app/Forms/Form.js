import React, { useState, useEffect } from 'react';
import Identification from './components/Identification';
import BesoinSec from './components/BesoinSec';
import Signup from './components/Signup';
import Login from './components/Login';
import {
  login,
  signout,
  signup,
  autolog,
  fetchForm
} from '../../redux/actions';
import { connect } from 'react-redux';
import Init from './components/Init';
import UpdateProjName from './components/UpdateProjName';
import ImpactsPotentiels from './components/ImpactsPotentiels';
import ImportancesVuln from './components/ImportancesVuln';
import MenacesPotentiels from './components/MenacesPotentiels';
import requireAuth from './components/requireAuth';
import ReactDOM from 'react-dom';

const Form = props => {
  const [send, setSend] = useState(false);
  useEffect(() => {
    if (props.formName.type) {
      props.fetchForm(props.formName.type);
    }
  }, [props.formName]);
  const renderForm = formName => {
    console.log('from form', formName);
    switch (formName) {
      case 'identification':
        return (
          <Identification setSend={setSend} send={send} quit={props.quit} />
        );
      case 'besoin sécurité':
        return (
          <BesoinSec
            formName={props.formName}
            setSend={setSend}
            send={send}
            quit={props.quit}
          />
        );
      case 'signup':
        return <Signup setSend={setSend} send={send} quit={props.quit} />;
      case 'login':
        return <Login setSend={setSend} send={send} quit={props.quit} />;
      case 'init':
        return <Init setSend={setSend} send={send} quit={props.quit} />;
      case 'update project name':
        return (
          <UpdateProjName
            values={props.values}
            setSend={setSend}
            send={send}
            quit={props.quit}
          />
        );
      case 'impacts potentiels':
        return (
          <BesoinSec
            formName={props.formName}
            setSend={setSend}
            send={send}
            quit={props.quit}
          />
        );
      case 'importances des vulnérabilités':
        return (
          <BesoinSec
            formName={props.formName}
            setSend={setSend}
            send={send}
            quit={props.quit}
          />
        );
      case 'menaces potentielles':
        return (
          <BesoinSec
            formName={props.formName}
            setSend={setSend}
            send={send}
            quit={props.quit}
          />
        );
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
                <p className='modal-card-title'>{props.formName.type}</p>
                <button
                  className='delete'
                  aria-label='close'
                  onClick={props.quit}></button>
              </header>
              <section id='modal' className='modal-card-body'>
                {renderForm(props.formName.type)}
              </section>
            </div>
            <footer className='modal-card-foot'>
              <button
                onClick={setSend}
                type='submit'
                className='button is-success'>
                Submit
              </button>
              <button type='reset' className='button'>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { autolog, login, signout, signup, fetchForm })(
  requireAuth(Form)
);
