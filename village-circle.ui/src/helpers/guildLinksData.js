import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllLinks = (guildId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/guildLinks/${guildId}`)
    .then((result) => {
      const links = result.data;
      resolve(links);
    })
    .catch((error) => reject(error));
});

const createNewLink = (linkObject) => axios.post(`${baseUrl}/guildLinks`, linkObject);

const deleteLink = (linkId) => axios.delete(`${baseUrl}/guildLinks/${linkId}`);

export default { getAllLinks, createNewLink, deleteLink };
