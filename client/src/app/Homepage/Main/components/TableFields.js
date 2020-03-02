import React from 'react';

const TableFields = () => {
  return (
    <tr>
      <th>
        <abbr title='Position'>Projet</abbr>
      </th>
      <th>Initiateur</th>
      <th>
        <abbr title='Played'>Homologation</abbr>
      </th>
      <th>
        <abbr title='Won'>Besoin en sécurité</abbr>
      </th>
      <th>
        <abbr title='Drawn'>Impacts potentiels sur le SI</abbr>
      </th>
      <th>
        <abbr title='Lost'>Menaces potentiels sur le SI</abbr>
      </th>
      <th>
        <abbr title='Goals for'>Importances des vulnérabilités</abbr>
      </th>
    </tr>
  );
};

export default TableFields;
