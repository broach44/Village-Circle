import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllCircles = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/circles`)
    .then((result) => {
      const circles = result.data;
      resolve(circles);
    })
    .catch((err) => reject(err));
});

export default { getAllCircles };
