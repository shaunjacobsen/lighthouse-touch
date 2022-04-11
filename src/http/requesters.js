import axios from 'axios';

export const serverRequester = axios.create({
  baseURL: "http://localhost:4010"
})