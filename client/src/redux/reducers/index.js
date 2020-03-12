import { combineReducers } from 'redux';
import { test } from './test.reducer';
import { projects } from './projects.reducer';
import { auth } from './auth.reducer';
import { form } from './form.reducer';
import { savedProjects } from './savedProjects.reducer';
import {answer} from "./answer.reducer"

export default combineReducers({
  test,
  projects,
  auth,
  form,
  savedProjects,
  answer
});
