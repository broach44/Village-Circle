import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllLinks = (circleId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/circleLinks/${circleId}`)
    .then((result) => {
      const links = result.data;
      resolve(links);
    })
    .catch((error) => reject(error));
});

const createNewLink = (linkObject) => axios.post(`${baseUrl}/circleLinks`, linkObject);

const deleteLink = (linkId) => axios.delete(`${baseUrl}/circleLinks/${linkId}`);

export default { getAllLinks, createNewLink, deleteLink };
