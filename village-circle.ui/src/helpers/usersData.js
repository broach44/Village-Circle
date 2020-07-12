import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getSingleUserData = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${userId}`)
    .then((result) => {
      const user = result.data;
      resolve(user);
    })
    .catch((err) => reject(err));
});

export default { getSingleUserData };
