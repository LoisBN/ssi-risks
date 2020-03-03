import React, { useState } from 'react';
import Identification from './components/Identification';
import BesoinSec from './components/BesoinSec';
import Signup from './components/Signup';
import Login from './components/Login';
import { login, signout, signup, autolog } from '../../redux/actions';
import { connect } from 'react-redux';
import Init from './components/Init';
import UpdateProjName from './components/UpdateProjName';
import ImpactsPotentiels from './components/ImpactsPotentiels';
import ImportancesVuln from './components/ImportancesVuln';
import MenacesPotentiels from './components/MenacesPotentiels';

const Form = props => {
  const [send, setSend] = useState(false);
  const renderForm = formName => {
    switch (formName) {
      case 'identification':
        return (
          <Identification setSend={setSend} send={send} quit={props.quit} />
        );
      case 'besoin sécurité':
        return <BesoinSec setSend={setSend} send={send} quit={props.quit} />;
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
          <ImpactsPotentiels
            values={props.values}
            setSend={setSend}
            send={send}
            quit={props.quit}
          />
        );
      case 'importances vulnérabilités':
        return (
          <ImportancesVuln
            values={props.values}
            setSend={setSend}
            send={send}
            quit={props.quit}
          />
        );
      case 'menaces potentiels':
        return (
          <MenacesPotentiels
            values={props.values}
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
                <p className='modal-card-title'>{props.formName}</p>
                <button
                  className='delete'
                  aria-label='close'
                  onClick={props.quit}></button>
              </header>
              <section className='modal-card-body'>
                {renderForm(props.formName)}
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

export default connect(null, { autolog, login, signout, signup })(Form);
