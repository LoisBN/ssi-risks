import React from 'react';

const TableFinalContent = props => {
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
          props.setFormName('homologation');
        }}>
        {props.homologation}
      </td>
    </tr>
  );
};

export default TableFinalContent;
