import { combineReducers } from 'redux';
import { test } from './test.reducer';
import { projects } from './projects.reducer';
import { auth } from './auth.reducer';

export default combineReducers({
  test,
  projects,
  auth
});
