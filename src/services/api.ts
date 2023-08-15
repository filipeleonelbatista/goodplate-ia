import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.clarifai.com',
  headers:{
    "Authorization": "Key eb074e4e5c004dfe9f729be730ce4497"
  }
})