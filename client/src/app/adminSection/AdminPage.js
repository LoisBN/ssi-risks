import React from 'react';
import requireAdmin from './requireAdmin';

const AdminPage = () => {
  return (
    <div className='section'>
      <div className='container'>
        <div className='field'>
          <label className='label'>changer un formulaire</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              placeholder='nom du formulaire'
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>créer un champ</label>
          <div className='control'>
            <input className='input' type='text' placeholder='type du champ' />
          </div>
          <div className='control'>
            <input className='input' type='text' placeholder='question' />
          </div>
          <div className='control'>
            <input
              className='input'
              type='text'
              placeholder='réponse par défaut'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default requireAdmin(AdminPage);
