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
  CREATE_FORM
} from './types';
import { fakeApi, authApi, projectApi, formApi } from '../../config/api';

export const test = () => dispatch => {
  dispatch({
    type: TEST,
    payload: 'test'
  });
};

export const fetchProj = () => async dispatch => {
  const res = await projectApi.get('/projects');
  console.log('projects', res.data);
  dispatch({
    type: FETCH_LIST_PROJ,
    payload: res.data
  });
};

export const fetchForm = formName => async dispatch => {
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
  const res = await formApi.get('/' + x);
  console.log(res.data);
  if (res.data) {
    dispatch({
      type: FETCH_FORM,
      payload: res.data
    });
  }
};

export const createForm = (formName, values) => async dispatch => {
  let x = '';
  switch (formName) {
    case 'besoin sécurité':
      x = 'besoinSec';
      break;
    default:
      break;
  }
  await formApi.post('/' + x, values);

  dispatch({
    type: CREATE_FORM
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
