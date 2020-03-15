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
      <td title='date demande homologation'>
        {props.dateSave || "this information is not available now"}
      </td>
      <td
        style={{cursor:"pointer"}}
        title="type homologation"
        onClick={ () => {
          props.setFormName({ type: 'recap', name: props.id });
          props.setDisplayPanel(true);
        }}>
        { props.homologation <= 3 && "homologation sommaire" }{ ( props.homologation > 3 && props.homologation <= 7 ) && "homologation simplifiée" }{ props.homologation >= 8 && "homologation standard"} : ({props.homologation} points)
      </td>
      <td title='date demande homologation'>
        { (props.certified && props.certified.certif) ? "homologué par l'administrateur" : "en cours ..." } <br />
        {(props.certified && props.certified.date) ? props.certified.date : ""}
      </td>
    </tr>
  );
};

export default TableFinalContent;
