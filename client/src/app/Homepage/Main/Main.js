import React, { useEffect, useState } from 'react';
import { fetchProj } from '../../../redux/actions';
import { connect } from 'react-redux';
import TableContent from './components/TableContent';
import PackmanLoader from './components/PackmanLoader';
import TableFields from './components/TableFields';
import BaremTable from './components/BaremTable';
import Form from '../../Forms/Form';
import { Link } from 'react-router-dom';

const Main = ({ fetchProj, projects, auth }) => {
  const [formName, setFormName] = useState('');
  const [filter, setFilter] = useState('');
  const [values, setValues] = useState('');
  const [displayModal, setDisplayModal] = useState('false');
  useEffect(() => {
    if (projects.length === 0) fetchProj();
  }, [projects]);
  return (
    <div className='section'>
      {
        <Form
          formName={formName}
          values={values}
          displayModal={displayModal}
          quit={setDisplayModal}
        />
      }
      <button className='button is-dark'>Lister tous les projets</button>{' '}
      {auth.authenticated && (
        <button
          className='button is-dark'
          onClick={() => {
            setDisplayModal(true);
            setFormName('init');
          }}>
          Initier un projet
        </button>
      )}{' '}
      {auth.admin && (
        <button className='button is-dark'>
          <Link to='/admin' style={{ color: 'white' }}>
            Administration
          </Link>
        </button>
      )}
      <br />
      <br />
      <div className='container'>
        <input
          style={{ width: '180px', height: '40px' }}
          type='search'
          placeholder="filter les projets par l'initiateur"
          value={filter}
          onChange={e => setFilter(e.target.value.toLowerCase())}
        />
        <div className='columns'>
          <div className='column'>
            <div className='table-container'>
              <table className='table table-custom is-bordered is-striped is-narrow is-hoverable'>
                <thead>
                  <TableFields />
                </thead>
                <tfoot>
                  <TableFields />
                </tfoot>
                <tbody className='custom-tbody'>
                  {Object.values(projects).length > 0 ? (
                    Object.values(projects).map((val, id) => {
                      console.log(val);
                      if (val.name.toLowerCase().includes(filter)) {
                        return (
                          <TableContent
                            key={id}
                            setDisplayModal={setDisplayModal}
                            formName={formName}
                            setFormName={setFormName}
                            id={val.name}
                            name={val.initiator}
                            setValues={setValues}
                          />
                        );
                      }
                      return '';
                    })
                  ) : (
                    <>
                      <tr>
                        <PackmanLoader />
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className='column'>
              <BaremTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  projects: state.projects,
  auth: state.auth
});

export default connect(mapStateToProps, { fetchProj })(Main);
