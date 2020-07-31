import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllAnnouncements = (circleId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/announcements/${circleId}`)
    .then((result) => {
      const announcements = result.data;
      resolve(announcements);
    })
    .catch((error) => reject(error));
});

export default { getAllAnnouncements };
