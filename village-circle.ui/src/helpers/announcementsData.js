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

const createNewAnnouncement = (announcementObj) => axios.post(`${baseUrl}/announcements`, announcementObj);

const deleteAnnouncement = (announcementId) => axios.delete(`${baseUrl}/announcements/${announcementId}`);

export default { getAllAnnouncements, createNewAnnouncement, deleteAnnouncement };
