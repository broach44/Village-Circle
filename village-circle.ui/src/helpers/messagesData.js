import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllMessages = (messageBoardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/messages/${messageBoardId}`)
    .then((result) => {
      const messages = result.data;
      resolve(messages);
    })
    .catch((err) => reject(err));
});

const postNewMessage = (messageObject) => axios.post(`${baseUrl}/messages`, messageObject);

export default { getAllMessages, postNewMessage };
