import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getPointTotal = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pointsystem/${userId}`)
    .then((result) => {
      const total = result.data;
      resolve(total);
    })
    .catch((err) => reject(err));
});

const addPoints = (pointEntryObj) => axios.post(`${baseUrl}/pointsystem`, pointEntryObj);

export default { getPointTotal, addPoints };
