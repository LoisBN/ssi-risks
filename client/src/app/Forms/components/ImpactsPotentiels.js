import React from 'react';
import { connect } from 'react-redux';

const ImpactsPotentiels = props => {
  return (
    <>
      {props.form.map((val, index) => {
        if (index > 1) {
          switch (val.type) {
            case 'input':
              return (
                <div key={index} class='field'>
                  <label class='label'>{val.q}</label>
                  <div class='control'>
                    <input class='input' type='text' placeholder='Text input' />
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

export default connect(mapsStateToProps)(ImpactsPotentiels);
