import React from 'react';

const TableContent = props => {
  return (
    <tr>
      <th
        title='nom du projet'
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('update project name');
          props.setValues(props.id);
        }}>
        {props.id}
      </th>
      <td
        title='initiateur'
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('besoin sécurité');
          props.setValues(props.id);
        }}>
        {props.name}
      </td>
      <td
        title='homologation'
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('besoin sécurité');
        }}>
        38
      </td>
      <td
        data-tooltip='Tooltip Text'
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('besoin sécurité');
        }}>
        23
      </td>
      <td
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('besoin sécurité');
        }}>
        12
      </td>
      <td
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('besoin sécurité');
        }}>
        3
      </td>
      <td
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('besoin sécurité');
        }}>
        68
      </td>
      <td
        style={{ borderColor: 'white', cursor: 'pointer' }}
        className='is-dark'
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('besoin sécurité');
        }}>
        <strong style={{ color: 'white' }}>Sauvegarder</strong>
      </td>
    </tr>
  );
};

export default TableContent;
