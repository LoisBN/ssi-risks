import React, { useState } from 'react';

const Identification = props => {
  return (
    <>
      <div className='field'>
        <label className='label'>Qui est l'initiateur du projet ?</label>
        <div className='control'>
          <input className='input' type='text' placeholder='Text input' />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Quel est le nom du projet ?</label>
        <div className='control'>
          <input className='input' type='text' placeholder='Text input' />
        </div>
        <p className='help is-success'>Ce nom de projet est disponible</p>
      </div>

      <div className='field'>
        <label className='label'>Quel est le processus métier impacté ?</label>
        <div className='control'>
          <textarea className='textarea' placeholder='Textarea'></textarea>
        </div>
      </div>

      <div className='field'>
        <label className='label'>Quel est le besoin exprimé ?</label>
        <div className='control'>
          <div className='select'>
            <select>
              <option>Application existante</option>
              <option>Nouveau besoin</option>
              <option>Remplacement d'une application existante</option>
            </select>
          </div>
        </div>
      </div>

      <div className='field'>
        <label className='label'>Quel est le processus métier impacté ?</label>
        <div className='control'>
          <label className='radio'>
            <input type='radio' name='besoin-mobi' />
            Yes
          </label>
          <label className='radio'>
            <input type='radio' name='question' />
            No
          </label>
        </div>
      </div>

      {true && (
        <div className='field'>
          <label className='label'>Lequel</label>
          <div className='control'>
            <textarea className='textarea' placeholder='Textarea'></textarea>
          </div>
        </div>
      )}

      <div className='field'>
        <label className='label'>Email</label>
        <div className='control has-icons-left has-icons-right'>
          <input
            className='input is-danger'
            type='email'
            placeholder='Email input'
            value='hello@'
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-envelope'></i>
          </span>
          <span className='icon is-small is-right'>
            <i className='fas fa-exclamation-triangle'></i>
          </span>
        </div>
        <p className='help is-danger'>This email is invalid</p>
      </div>

      <div className='field'>
        <label className='label'>Subject</label>
        <div className='control'>
          <div className='select'>
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div className='field'>
        <label className='label'>Message</label>
        <div className='control'>
          <textarea className='textarea' placeholder='Textarea'></textarea>
        </div>
      </div>

      <div className='field'>
        <div className='control'>
          <label className='checkbox'>
            <input type='checkbox' />I agree to the{' '}
            <a href='/'>terms and conditions</a>
          </label>
        </div>
      </div>

      <div className='field'>
        <div className='control'>
          <label className='radio'>
            <input type='radio' name='question' />
            Yes
          </label>
          <label className='radio'>
            <input type='radio' name='question' />
            No
          </label>
        </div>
      </div>
    </>
  );
};

export default Identification;
