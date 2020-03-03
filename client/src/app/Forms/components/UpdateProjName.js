import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { updateProj, fetchProj } from '../../../redux/actions';

const UpdateProjName = props => {
  const submit = useRef();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (props.send) {
      submit.current.click();
      props.setSend(false);
    }
  }, [props.send]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(name);
    await props.updateProj(props.values, name);
    props.fetchProj();
  };

  const handleChange = e => {
    if (e.target.value.length <= 20) {
      setName(e.target.value);
      setErrors('');
    } else {
      setErrors('Le nom du projet est trop long');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>current project name : {props.values}</p>
      <br />
      <div className='field'>
        <label className='label'>Nouveau nom</label>
        <div className='control'>
          <input
            onChange={handleChange}
            className='input'
            type='text'
            placeholder='Name'
          />
        </div>
      </div>
      <input ref={submit} style={{ display: 'none' }} type='submit' />
    </form>
  );
};

export default connect(null, { fetchProj, updateProj })(UpdateProjName);
