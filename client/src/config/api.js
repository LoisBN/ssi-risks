import axios from 'axios';

export const fakeApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users'
});

export const authApi = axios.create({
  baseURL: ':8200'
});
