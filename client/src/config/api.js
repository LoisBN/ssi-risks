import axios from 'axios';

export const fakeApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users'
});

export const authApi = axios.create({
  baseURL: '/auth'
});

export const projectApi = axios.create({
  baseURL: '/service-project'
});

export const formApi = axios.create({
  baseURL: '/service-form'
});
export const formulaApi = axios.create({
  baseURL: '/service-formula'
});
