import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getGoals = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/goals/${userId}`)
    .then((result) => {
      const goals = result.data;
      resolve(goals);
    })
    .catch((err) => reject(err));
});

const createGoal = (newGoal) => axios.post(`${baseUrl}/goals`, newGoal);

export default { getGoals, createGoal };
