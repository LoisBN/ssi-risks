import React, { useEffect, useState } from 'react';
import { fetchProj } from '../../../redux/actions';
import { connect } from 'react-redux';
import TableContent from './components/TableContent';
import PackmanLoader from './components/PackmanLoader';
import TableFields from './components/TableFields';
import BaremTable from './components/BaremTable';
import Form from '../../Forms/Form';

const Main = ({ fetchProj, projects }) => {
  const [formName, setFormName] = useState('');
  const [filter, setFilter] = useState('');
  const [displayModal, setDisplayModal] = useState('false');
  useEffect(() => {
    if (projects.length === 0) fetchProj();
  });
  return (
    <div className='section'>
      {
        <Form
          formName={formName}
          displayModal={displayModal}
          quit={setDisplayModal}
        />
      }
      <button className='button is-dark'>Lister tous les projets</button>{' '}
      <button
        className='button is-dark'
        onClick={() => {
          setDisplayModal(true);
          setFormName('identification');
        }}>
        Initier un projet
      </button>
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
                  {projects.length > 0 ? (
                    projects.map((val, id) => {
                      if (val.name.toLowerCase().includes(filter)) {
                        return (
                          <TableContent
                            key={id}
                            setDisplayModal={setDisplayModal}
                            formName={formName}
                            setFormName={setFormName}
                            id={val.id}
                            name={val.name}
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
  projects: state.projects
});

export default connect(mapStateToProps, { fetchProj })(Main);
