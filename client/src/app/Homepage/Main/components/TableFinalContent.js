import React from 'react';

const TableFinalContent = props => {
  return (
    <tr>
      <th title='nom du projet'>
        {props.id}
      </th>
      <td title='initiateur'>
        {props.name}
      </td>
      <td
        title='homologation'
        onClick={ () => {
          props.setFormName({ type: 'recap', name: props.id });
          props.setDisplayPanel(true);
        }}>
        {props.homologation}
      </td>
    </tr>
  );
};

export default TableFinalContent;
