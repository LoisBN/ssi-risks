import axios from 'axios';

export const fakeApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users'
});

export const authApi = axios.create({
  baseURL: 'http://localhost:8100'
});

export const projectApi = axios.create({
  baseURL: 'http://localhost:8000'
});

export const formApi = axios.create({
  baseURL: 'http://localhost:8300'
});
