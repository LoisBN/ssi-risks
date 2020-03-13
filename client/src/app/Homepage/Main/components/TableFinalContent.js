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
        { props.homologation <= 3 && "homologation sommaire" }{ ( props.homologation > 3 && props.homologation <= 7 ) && "homologation simplifiée" }{ props.homologation >= 8 && "homologation standard"} : ({props.homologation} points)
      </td>
    </tr>
  );
};

export default TableFinalContent;
