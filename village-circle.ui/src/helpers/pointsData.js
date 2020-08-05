import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getPointTotal = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pointsystem/${userId}`)
    .then((result) => {
      const total = result.data;
      resolve(total);
    })
    .catch((err) => reject(err));
});

const getActivityOptions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pointSystem/options`)
    .then((result) => {
      const options = result.data;
      resolve(options);
    })
    .catch((error) => reject(error));
});

const getUserActivityLog = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pointsystem/log/${userId}`)
    .then((result) => {
      const activities = result.data;
      resolve(activities);
    })
    .catch((error) => reject(error));
})

const addPoints = (pointEntryObj) => axios.post(`${baseUrl}/pointsystem`, pointEntryObj);

export default {
  getPointTotal,
  addPoints,
  getActivityOptions,
  getUserActivityLog,
};
