import { TEST, FETCH_LIST_PROJ, LOGIN, SIGNUP, LOGOUT } from './types';
import { fakeApi, authApi } from '../../config/api';

export const test = () => dispatch => {
  dispatch({
    type: TEST,
    payload: 'test'
  });
};

export const fetchProj = () => async dispatch => {
  const res = await fakeApi.get('/');
  console.log(res.data);
  dispatch({
    type: FETCH_LIST_PROJ,
    payload: res.data
  });
};

export const signup = formValues => async dispatch => {
  const res = await authApi.post('/signup', formValues);
  console.log(res.data);
  if (res.data.acess_token) {
    localStorage.setItem('access_token', res.data.access_token);
    dispatch({
      type: SIGNUP,
      payload: res.data
    });
  }
};

export const login = formValues => async dispatch => {
  const res = await authApi.post('/login', formValues);
  console.log(res.data);
  if (res.data.acess_token) {
    localStorage.setItem('access_token', res.data.acess_token);
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
  if (res.data.acess_token) {
    dispatch({
      type: LOGIN,
      payload: res.data
    });
  }
};

export const signout = () => dispatch => {
  localStorage.removeItem('access_token');
  dispatch({
    type: LOGOUT
  });
};
