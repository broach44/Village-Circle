import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllAnnouncements = (guildId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/guildannouncements/${guildId}`)
    .then((result) => {
      const announcements = result.data;
      resolve(announcements);
    })
    .catch((error) => reject(error));
});

const createNewAnnouncement = (announcementObj) => axios.post(`${baseUrl}/guildannouncements`, announcementObj);

const deleteAnnouncement = (announcementId) => axios.delete(`${baseUrl}/guildannouncements/${announcementId}`);

export default { getAllAnnouncements, createNewAnnouncement, deleteAnnouncement };
