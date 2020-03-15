import {
  TEST,
  FETCH_LIST_PROJ,
  LOGIN,
  SIGNUP,
  LOGOUT,
  PROJ_INIT,
  PROJ_UPDATED,
  AUTOLOGIN,
  FETCH_FORM,
  CREATE_FORM,
  SAVE_FORM,
  FETCH_SAVED_PROJ,
  FETCH_ANSWER,
  CLEAN_UP_ANSWER,
  CLEAN_UP_FORM
} from './types';
import {
  fakeApi,
  authApi,
  projectApi,
  formApi,
  formulaApi
} from '../../config/api';

export const test = () => dispatch => {
  dispatch({
    type: TEST,
    payload: 'test'
  });
};

export const fetchProj = () => async (dispatch,getState) => {
  const res = await projectApi.get('/projects/get/'+ getState().auth.username);
  const res2 = await console.log('projects', res.data);
  dispatch({
    type: FETCH_LIST_PROJ,
    payload: res.data
  });
};

export const cleanupAnswer = () => dispatch  => {
  dispatch( {
    type: CLEAN_UP_ANSWER
  })
}

export const fetchForm = (formName,name) => async dispatch => {
  let x = '';
  switch (formName) {
    case 'besoin sécurité':
      x = 'besoinSec';
      break;
    case 'homologation':
      x = 'homologation';
      break;
    case 'impacts potentiels':
      x = 'impacts';
      break;
    case 'menaces potentielles':
      x = 'menaces';
      break;
    case 'importances des vulnérabilités':
      x = 'importanceVuln';
      break;
    default:
      return;
  }
  const res = await formApi.get( '/' + x );
  if (res.data) {
    dispatch({
      type: FETCH_FORM,
      payload: res.data
    });
  }
  const res2 = await formulaApi.get( `/get/${ x }/${ name }` )
  setTimeout( () => {
    return;
  },2000)
  dispatch( {
    type: FETCH_ANSWER,
    payload: res2.data
  } );
  
};

export const cleanupForm = () => dispatch => {
  dispatch({type : CLEAN_UP_FORM})
}

export const createForm = (formName, values) => async dispatch => {
  let x = '';
  switch (formName) {
    case 'besoin sécurité':
      x = 'besoinSec';
      break;
    case 'impacts potentiels':
      x = 'impacts';
      break;
    case 'menaces potentielles':
      x = 'menaces';
      break;
    case 'importance des vulnérabilités':
      x = 'importanceVuln';
      break;
    default:
      break;
  }
  await formApi.post('/' + x, { ...values, name: x });

  dispatch({
    type: CREATE_FORM
  });
};

export const sendForm = (formName, initiator, values) => async dispatch => {
  console.log('from actions', formName.name);
  let x = '';
  switch (formName.type) {
    case 'besoin sécurité':
      x = 'besoinSec';
      break;
    case 'impacts potentiels':
      x = 'impacts';
      break;
    case 'menaces potentielles':
      x = 'menaces';
      break;
    case 'importances des vulnérabilités':
      x = 'importanceVuln';
      break;
    default:
      break;
  }
  await formApi.post(`/save/${x}`, {
    ...values,
    formName: formName.name,
    initiator
  });
  dispatch({
    type: SAVE_FORM
  });
};

export const updateFormVal = (formField, formName) => async (dispatch,getState) => {
  let x = '';
  switch (formField) {
    case 'besoin sécurité':
      x = 'besoinSec';
      break;
    case 'impacts potentiels':
      x = 'impacts';
      break;
    case 'menaces potentielles':
      x = 'menaces';
      break;
    case 'importances des vulnérabilités':
      x = 'importanceVuln';
      break;
    default:
      break;
  }
  await formulaApi.get(`/update/${x}/${formName}`);
  const res = await projectApi.get('/projects/get/'+ getState().auth.username);
  dispatch({
    type: FETCH_LIST_PROJ,
    payload: res.data
  });
};

export const fetchAnswer = (formField,name) => async dispatch => {
  let x = '';
  switch (formField) {
    case 'besoin sécurité':
      x = 'besoinSec';
      break;
    case 'impacts potentiels':
      x = 'impacts';
      break;
    case 'menaces potentielles':
      x = 'menaces';
      break;
    case 'importances des vulnérabilités':
      x = 'importanceVuln';
      break;
    default:
      break;
  }
  const res = await formulaApi.get( `/get/${ x }/${ name }` )
  dispatch( {
    type: FETCH_ANSWER,
    payload: res.data
  })
}

export const discard = projectName => async (dispatch,getState) => {
  await projectApi.get( `/project/delete/${ projectName }` );
  const res = await projectApi.get('/projects/get/'+ getState().auth.username);
  dispatch({
    type: FETCH_LIST_PROJ,
    payload: res.data
  });
}

export const certified = projectName => async (dispatch,getState) => {
  await projectApi.get( `/project/certified/${ projectName }` );
  const res = await projectApi.get( '/projects/fetchSaved' );
  await projectApi.get( `/project/delete/${ projectName }` );
  const res2 = await projectApi.get('/projects/get/'+ getState().auth.username);
  dispatch({
    type: FETCH_LIST_PROJ,
    payload: res2.data
  });
  dispatch({
    type: FETCH_SAVED_PROJ,
    payload: res.data
  });
}

export const saveProject = name => async dispatch => {
  await projectApi.post(`/project/save/${name}`);
  const res = await projectApi.get('/projects/fetchSaved');
  dispatch({
    type: FETCH_SAVED_PROJ,
    payload: res.data
  });
};

export const fetchSavedProjects = () => async dispatch => {
  const res = await projectApi.get('/projects/fetchSaved');
  dispatch({
    type: FETCH_SAVED_PROJ,
    payload: res.data
  });
};

export const initProj = formValues => async (dispatch, getState) => {
  const res = await projectApi.post('/project/init', {
    name: formValues,
    initiator: getState().auth.username
  });
  console.log(res.data);
  if (res.data) {
    dispatch({
      type: PROJ_INIT,
      payload: res.data
    });
  }
};

export const updateProj = (project, formValues) => async (
  dispatch,
  getState
) => {
  const res = await projectApi.put('/project/update/' + project, {
    name: formValues,
    initiator: getState().auth.username
  });
  if (res.data) {
    dispatch({
      type: PROJ_UPDATED
    });
  }
};

export const signup = formValues => async dispatch => {
  const res = await authApi.post('/signup', formValues);
  console.log(res.data);
  if (res.status == 200) {
    localStorage.setItem('access_token', res.data.access_token);
    dispatch({
      type: SIGNUP,
      payload: res.data
    });
  }
};

export const login = formValues => async dispatch => {
  const res = await authApi.post('/login', formValues);
  console.log(res.data.access_token);
  if (res.data) {
    localStorage.setItem('access_token', res.data.access_token);
    dispatch({
      type: LOGIN,
      payload: res.data
    });
  }
};

export const autolog = () => async dispatch => {
  const access_token = localStorage.getItem('access_token');
  const res = await authApi.post('/autologin', { access_token });
  console.log(res.data);
  console.log(res.data.access_token);
  dispatch({
    type: AUTOLOGIN,
    payload: res.data
  });
  console.log(res.data);
};

export const signout = () => dispatch => {
  localStorage.removeItem('access_token');
  dispatch({
    type: LOGOUT
  });
};
