import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { initProj, fetchProj } from '../../../redux/actions';

const Init = props => {
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
    await props.initProj(name);
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
      <div className='field'>
        <label className='label'>Quel est le nom du projet ?</label>
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

export default connect(null, { initProj, fetchProj })(Init);
