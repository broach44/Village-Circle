import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllAnnouncements = (circleId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/circleannouncements/${circleId}`)
    .then((result) => {
      const announcements = result.data;
      resolve(announcements);
    })
    .catch((error) => reject(error));
});

const createNewAnnouncement = (announcementObj) => axios.post(`${baseUrl}/circleannouncements`, announcementObj);

const deleteAnnouncement = (announcementId) => axios.delete(`${baseUrl}/circleannouncements/${announcementId}`);

export default { getAllAnnouncements, createNewAnnouncement, deleteAnnouncement };
