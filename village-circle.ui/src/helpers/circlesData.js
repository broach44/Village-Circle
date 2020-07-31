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

const getCirclesByUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/circles/owner/${userId}`)
    .then((result) => {
      const circles = result.data;
      resolve(circles);
    })
    .catch((error) => reject(error));
});

const getMemberListOfCircle = (circleId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/circleMembers/${circleId}`)
    .then((result) => {
      const members = result.data;
      resolve(members);
    })
    .catch((error) => reject(error));
})

const joinCircle = (memberInfo) => axios.post(`${baseUrl}/circles/newMember`, memberInfo);

const createNewCircle = (circleObj) => axios.post(`${baseUrl}/circles`, circleObj);

export default {
  getAllCircles,
  getCircleById,
  verifyMembership,
  joinCircle,
  getCirclesByUser,
  createNewCircle,
  getMemberListOfCircle,
};
