import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { sendForm, cleanupAnswer,updateFormVal,cleanupForm } from '../../../redux/actions';

const BesoinSec = props => {
  if ( !props.displayModal ) {
    ReactDOM.unmountComponentAtNode( document.querySelector( '#modal' ) );
  }
  const [ form, setForm ] = useState( {} );
  const [ defaultAnswer, setDefaultAnswer ] = useState( props.answer )
  const submit = useRef();
  useEffect( () => {
    if ( props.send ) {
      submit.current.click();
      props.setSend( false );
      props.cleanupAnswer()
      props.setDisabled( true );
    }
  }, [ props.send ] );
  useEffect( () => {
    setDefaultAnswer( props.answer )
    console.log( props.answer[ "ceci est une question" ] );
  }, [ props.answer ] )
  useEffect( () => {
    if ( Object.keys( form ).length >= props.form.length - 2 ) props.setDisabled( false )
    else props.setDisabled( true );
  })
  const handleSubmit = e => {
    e.preventDefault();
    console.log( form );
    console.log( 'formName', props.formName );
    props.cleanupForm();
    
    props.sendForm( props.formName, props.auth.username, form );
    setForm( {} );
    setTimeout( () => {
      props.updateFormVal( props.formName.type, props.formName.name );
    }, 500 );

    console.log( 'from handlesubmit', form );
    props.quit();
  };
  const renderForm = (answer) => {
      if ( answer ) {
        return (
          <>
            <form onSubmit={ handleSubmit }>
              { props.form.map( ( val, index ) => {
                console.log( val.type );
                if ( index < props.form.length - 2 ) {
                  const valueI = val.q;
                  const q = val.quotation;
                  switch ( val.type ) {
                    case 'input':
                      console.log("this is the valI",valueI)
                      return (
                        <div key={ index } class='field'>
                          <label className='label'>{ val.q }</label>
                          
                          <div className='control'>
                            <input
                              required
                              name={ val.q }
                              onChange={ e =>
                                setForm( {
                                  ...form,
                                  [ valueI ]: { answer: e.target.value, quotation: q }
                                } )
                              }
                              onFocus={ e =>
                                setForm( {
                                  ...form,
                                  [ valueI ]: { answer: e.target.value, quotation: q }
                                } )
                              }
                              value={form[valueI] ? form[valueI].answer : defaultAnswer[valueI]}
                              className='input'
                              type='text'
                              placeholder='Text input'
                            />
                          </div>
                        </div>
                      );
                      break;
                    case 'date':
                      console.log("this is the valI",valueI)
                      return (
                        <div key={ index } class='field'>
                          <label className='label'>{ val.q }</label>
                          
                          <div className='control'>
                            <input
                              required
                              name={ val.q }
                              type="date"
                              onChange={ e =>
                                setForm( {
                                  ...form,
                                  [ valueI ]: { answer: e.target.value, quotation: q }
                                } )
                              }
                              onFocus={ e =>
                                setForm( {
                                  ...form,
                                  [ valueI ]: { answer: e.target.value, quotation: q }
                                } )
                              }
                              value={form[valueI] ? form[valueI].answer : defaultAnswer[valueI]}
                              placeholder='Text input'
                            />
                          </div>
                        </div>
                      );
                    case 'textarea':
                      return (
                        <div key={ index } className='field'>
                          <label className='label'>{ val.q }</label>
                      
                          <div className='control'>
                            <textarea
                              required
                              name={ val.q }
                              onChange={ e =>
                                setForm( {
                                  ...form,
                                  [ valueI ]: { answer: e.target.value, quotation: q }
                                } )
                              }
                              onFocus={ e =>
                                setForm( {
                                  ...form,
                                  [ valueI ]: { answer: e.target.value, quotation: q }
                                } )
                              }
                              value={form[valueI] ? form[valueI].answer : defaultAnswer[valueI]}
                              className='textarea'
                              placeholder='Textarea'></textarea>
                          </div>
                        </div>
                      );
                      break;
                    case 'radio':
                      const res = val.r.split( ',' );

                      return (
                        <div key={ index } class='field'>
                          <label className='label'>{ val.q }</label>
                          <p>previous value : { answer[ valueI ] ? defaultAnswer[ valueI ]  : "none" }</p>
                          <div className='control'>
                            { res.map( ( value, index ) => {
                              return (
                                <>
                                  <input
                                    required
                                    type='radio'
                                    id={ value }
                                    onChange={ e =>
                                      setForm( {
                                        ...form,
                                        [ valueI ]: {
                                          answer: e.target.value,
                                          quotation: (q*index).toString()
                                        }
                                      } )
                                    }
                                    onFocus={ e =>
                                      setForm( {
                                        ...form,
                                        [ valueI ]: {
                                          answer: e.target.value,
                                          quotation: (q*index).toString()
                                        }
                                      } )
                                    }
                                    value={ value }
                                    name={ val.q }
                                    placeholder='Text input'
                                  />{ ' ' }
                                  <label htmlFor={ value }>{ value }</label>
                                  <br />
                                </>
                              );
                            } ) }
                          </div>
                        </div>
                      );
                      break;
                    case 'checkbox':
                      const y = val.r.split( ',' );
                      console.log("from the checkbox",defaultAnswer)
                      return (
                        <div key={ index } class='field'>
                          <label className='label'>{ val.q }</label>
                          <p>previous value : { answer[valueI] ? Object.values(defaultAnswer[valueI]).join() : "none" }</p>
                          <div className='control'>
                            { y.map( ( value, index ) => {
                              return (
                                <>
                                  <input
                                    type='checkbox'
                                    id={ value }
                                    onChange={ e => {
                                      e.target.checked = true;
                                      const ev = e;
                                      const x = form[ index ];
                                      setForm( {
                                        ...form,
                                        [ valueI ]: {
                                          ...form[ valueI ],
                                          [ index ]: {
                                            answer: e.target.value,
                                            quotation: (q*index).toString()
                                          }
                                        }
                                      } );
                                    } }
                                    onFocus={ e => {
                                      e.target.checked = true;
                                      const ev = e;
                                      const x = form[ index ];
                                      setForm( {
                                        ...form,
                                        [ valueI ]: {
                                          ...form[ valueI ],
                                          [ index ]: {
                                            answer: e.target.value,
                                            quotation: (q*index).toString()
                                          }
                                        }
                                      } );
                                    } }
                                    value={ value }
                                    name={ val.q }
                                    placeholder='Text input'
                                  />{ ' ' }
                                  <label htmlFor={ value }>{ value }</label>
                                  <br />
                                </>
                              );
                            } ) }
                          </div>
                        </div>
                      );
                    default:
                      return <div>no such form</div>;
                  }
                }
              } ) }
              <input style={ { display: 'none' } } ref={ submit } type='submit' />
            </form>
          </>
        );
      };
  }
  return renderForm(defaultAnswer);
}
const mapsStateToProps = state => ({
  form: Object.values(state.form),
  rawForm: state.form,
  answer: state.answer,
  //formName: state.form.name,
  auth: state.auth
} );
  

export default connect(mapsStateToProps, {cleanupAnswer,cleanupForm, sendForm,updateFormVal })(
  BesoinSec
);
