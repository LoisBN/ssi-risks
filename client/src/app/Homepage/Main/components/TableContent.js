import React from 'react';
import { connect } from 'react-redux';
import { saveProject } from '../../../../redux/actions';

const TableContent = props => {
  return (
    <tr>
      <th
        title='nom du projet'
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName({ type: 'update project name' });
          props.setValues(props.id);
        }}>
        {props.id}
      </th>
      <td
        title='initiateur'
        onClick={() => {
          props.setValues(props.name);
        }}>
        {props.name}
      </td>
      <td title='homologation'>{props.homologation}</td>
      <td
        data-tooltip='Tooltip Text'
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName({ type: 'besoin sécurité', name: props.id });
        }}>
        {props.besoinSec}
      </td>
      <td
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName({ type: 'impacts potentiels', name: props.id });
        }}>
        {props.impacts}
      </td>
      <td
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName({ type: 'menaces potentielles', name: props.id });
        }}>
        {props.menaces}
      </td>
      <td
        onClick={() => {
          props.setDisplayModal(true);
          props.setFormName({
            type: 'importances des vulnérabilités',
            name: props.id
          });
        }}>
        {props.importanceVuln}
      </td>
      <td
        style={{ borderColor: 'white', cursor: 'pointer' }}
        className='is-dark'
        onClick={() => {
          //props.setDisplayModal(true);
          //props.setFormName( 'sauvegarder' );
          props.saveProject(props.id);
        }}>
        <strong style={{ color: 'white' }}>Sauvegarder</strong>
      </td>
    </tr>
  );
};

export default connect(null, { saveProject })(TableContent);
