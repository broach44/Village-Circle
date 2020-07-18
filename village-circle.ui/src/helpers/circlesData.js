import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllCircles = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/circles`)
    .then((result) => {
      const circles = result.data;
      resolve(circles);
    })
    .catch((err) => reject(err));
});

const getCircleById = (circleId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/circles/${circleId}`)
    .then((result) => {
      const circle = result.data;
      resolve(circle);
    })
    .catch((err) => reject(err));
});

const verifyMembership = (userId, circleId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/circles/memberVerify/${userId}/${circleId}`)
    .then((result) => {
      const isMember = result.data;
      resolve(isMember);
    })
    .catch((error) => reject(error));
});

const joinCircle = (memberInfo) => axios.post(`${baseUrl}/circles/newMember`, memberInfo);

export default {
  getAllCircles,
  getCircleById,
  verifyMembership,
  joinCircle,
};
