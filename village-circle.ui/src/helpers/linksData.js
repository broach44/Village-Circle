import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllLinks = (circleId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/links/${circleId}`)
    .then((result) => {
      const links = result.data;
      resolve(links);
    })
    .catch((error) => reject(error));
});

const createNewLink = (linkObject) => axios.post(`${baseUrl}/links`, linkObject);

export default { getAllLinks, createNewLink };
