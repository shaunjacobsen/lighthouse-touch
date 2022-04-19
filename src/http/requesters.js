import axios from 'axios';

export const serverRequester = axios.create({
  baseURL: 'http://192.168.1.44:4010',
});

export const bridgeRequester = axios.create({
  baseURL: 'http://192.168.1.44:3002',
});
