import React, { useState, useRef } from 'react';
import requireAdmin from './requireAdmin';
import { createForm } from '../../redux/actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';

const AdminPage = props => {
  console.log(props);
  const [nbField, setNbField] = useState([1]);
  const [form, setForm] = useState([]);
  const [name, setName] = useState('besoin sécurité');
  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
    props.createForm(name, form);
  };

  return (
    <div className='section'>
      <div className='container'>
        <Link to='/'>home</Link>
        <form
          method='POST'
          encType='text/plain'
          action={'localhost:8300/' + name}
          onSubmit={handleSubmit}>
          <div className='field'>
            <label className='label'>changer un formulaire</label>
            <div className='control'>
              <select
                className='select'
                onChange={e => setName(e.target.value)}
                value={name}>
                <option>besoin sécurité</option>
                <option>impacts potentiels</option>
                <option>menaces potentielles</option>
                <option>importance des vulnérabilités</option>
              </select>
            </div>
          </div>
          {nbField.map((val, i) => {
            const questionnaire = {};
            questionnaire.type = 'input';
            return (
              <>
                <div className='field'>
                  <label className='label'>créer un champ</label>
                  <div className='control'>
                    <select
                      className='select'
                      onChange={e => (questionnaire.type = e.target.value)}>
                      <option>input</option>
                      <option>textarea</option>
                      <option>radio</option>
                      <option>checkbox</option>
                      <option>date</option>
                    </select>
                  </div>
                  <div className='control'>
                    <input
                      name='q'
                      readOnly={form[i] && true}
                      onChange={e => (questionnaire.q = e.target.value)}
                      className='input'
                      type='text'
                      placeholder='question'
                    />
                  </div>
                  <div className='control'>
                    <input
                      onChange={e => {
                        questionnaire.r = e.target.value;

                        console.log(questionnaire);
                      }}
                      name='r'
                      readOnly={form[i] && true}
                      className='input'
                      type='text'
                      placeholder='réponse par défaut'
                    />
                  </div>
                  <div className='control'>
                    <input
                      onChange={e => {
                        questionnaire.quotation = e.target.value;

                        console.log(questionnaire);
                      }}
                      name='r'
                      readOnly={form[i] && true}
                      type='number'
                      placeholder='quotation'
                    />
                  </div>
                </div>

                <button
                  className='button'
                  onClick={() => setForm([...form, questionnaire])}>
                  confirm values
                </button>
              </>
            );
          })}
          <br />{' '}
        </form>
        <button
          className='button is-dark'
          onClick={() => setNbField([...nbField, 1])}>
          add{' '}
        </button>
        <button
          className='button is-dark'
          onClick={() => {
            if (nbField.length > 1) {
              let x = nbField.slice(0, -1);
              setNbField(x);
            }
          }}>
          remove
        </button>
      </div>
    </div>
  );
};

export default requireAdmin(connect(null, { createForm })(AdminPage));
