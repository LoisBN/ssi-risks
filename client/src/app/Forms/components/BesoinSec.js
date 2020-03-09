import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { sendForm, updateFormVal } from '../../../redux/actions';

const BesoinSec = props => {
  if (!props.displayModal) {
    ReactDOM.unmountComponentAtNode(document.querySelector('#modal'));
  }
  const [form, setForm] = useState({});
  const submit = useRef();
  useEffect(() => {
    if (props.send) {
      submit.current.click();
      props.setSend(false);
    }
  }, [props.send]);
  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
    console.log('formName', props.formName);
    props.sendForm(props.formName, props.auth.username, form);
    setForm({});
    setTimeout(() => {
      props.updateFormVal(props.formName.type, props.formName.name);
    }, 500);

    console.log('from handlesubmit', form);
    props.quit();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {props.form.map((val, index) => {
          console.log(val.type);
          if (index < props.form.length - 2) {
            const valueI = val.q;
            const q = val.quotation;
            switch (val.type) {
              case 'input':
                return (
                  <div key={index} class='field'>
                    <label className='label'>{val.q}</label>
                    <div className='control'>
                      <input
                        required
                        name={val.q}
                        onChange={e =>
                          setForm({
                            ...form,
                            [valueI]: { answer: e.target.value, quotation: q }
                          })
                        }
                        value={form[valueI] ? form[valueI].answer : ''}
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
                      <textarea
                        required
                        name={val.q}
                        onChange={e =>
                          setForm({
                            ...form,
                            [valueI]: { answer: e.target.value, quotation: q }
                          })
                        }
                        value={form[valueI] ? form[valueI].answer : ''}
                        className='textarea'
                        placeholder='Textarea'></textarea>
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
                              required
                              type='radio'
                              id={value}
                              onChange={e =>
                                setForm({
                                  ...form,
                                  [valueI]: {
                                    answer: e.target.value,
                                    quotation: q
                                  }
                                })
                              }
                              value={value}
                              name={val.q}
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
                              onChange={e => {
                                const ev = e;
                                const x = form[index];
                                setForm({
                                  ...form,
                                  [valueI]: {
                                    ...form[valueI],
                                    [index]: {
                                      answer: e.target.value,
                                      quotation: q
                                    }
                                  }
                                });
                              }}
                              value={value}
                              name={val.q}
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
        <input style={{ display: 'none' }} ref={submit} type='submit' />
      </form>
    </>
  );
};

const mapsStateToProps = state => ({
  form: Object.values(state.form),
  rawForm: state.form,
  //formName: state.form.name,
  auth: state.auth
});

export default connect(mapsStateToProps, { sendForm, updateFormVal })(
  BesoinSec
);
