import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getSingleUserData = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${uid}`)
    .then((result) => {
      const user = result.data;
      resolve(user);
    })
    .catch((err) => reject(err));
});

export default { getSingleUserData };
