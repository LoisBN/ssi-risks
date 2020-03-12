import React from 'react';

const BaremTable = () => {
  return (
    <div className='table-container'>
      <table className='table is-bordered is-striped is-narrow is-hoverable'>
        <thead>
          <tr>
            <td>Homologation sommaire</td>
            <td>Homologation simplifiée</td>
            <td>Homologation standard</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0 à 3</td>
            <td>4 à 7</td>
            <td>>= 8</td>
          </tr>
        </tbody>
      </table>{' '}
    </div>
  );
};

export default BaremTable;
