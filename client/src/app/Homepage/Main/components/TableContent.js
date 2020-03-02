import React from 'react';

const TableContent = props => {
  return (
    <tr>
      <th title='nom du projet'>{props.id}</th>
      <td title='initiateur'>
        <a
          href='https://en.wikipedia.org/wiki/Leicester_City_F.C.'
          title='Leicester City F.C.'>
          {props.name}
        </a>{' '}
        <strong>(C)</strong>
      </td>
      <td title='homologation'>38</td>
      <td
        data-tooltip='Tooltip Text'
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName('besoin sécurité');
        }}>
        23
      </td>
      <td>12</td>
      <td>3</td>
      <td>68</td>
    </tr>
  );
};

export default TableContent;
