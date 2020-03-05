import React from 'react';
import { connect } from 'react-redux';

const BesoinSec = props => {
  return (
    <>
      {props.form.map((val, index) => {
        console.log(val.type);
        if (index < props.form.length - 2) {
          switch (val.type) {
            case 'input':
              return (
                <div key={index} class='field'>
                  <label className='label'>{val.q}</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      placeholder='Text input'
                    />
                  </div>
                </div>
              );
              break;
            case 'textarea':
              return (
                <div key={index} className='field'>
                  <label className='label'>{val.q}</label>
                  <div className='control'>
                    <textarea className='textarea' placeholder='Textarea'>
                      {val.r}
                    </textarea>
                  </div>
                </div>
              );
              break;
            case 'radio':
              const res = val.r.split(',');
              return (
                <div key={index} class='field'>
                  <label className='label'>{val.q}</label>
                  <div className='control'>
                    {res.map((value, index) => {
                      return (
                        <>
                          <input
                            type='radio'
                            id={value}
                            name={val.q}
                            value={value}
                            placeholder='Text input'
                          />{' '}
                          <label htmlFor={value}>{value}</label>
                          <br />
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            case 'checkbox':
            case 'radio':
              const y = val.r.split(',');
              return (
                <div key={index} class='field'>
                  <label className='label'>{val.q}</label>
                  <div className='control'>
                    {y.map((value, index) => {
                      return (
                        <>
                          <input
                            type='checkbox'
                            id={value}
                            name={val.q}
                            value={value}
                            placeholder='Text input'
                          />{' '}
                          <label htmlFor={value}>{value}</label>
                          <br />
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            default:
              return <div>no such form</div>;
          }
        }
      })}
    </>
  );
};

const mapsStateToProps = state => ({
  form: Object.values(state.form)
});

export default connect(mapsStateToProps)(BesoinSec);
