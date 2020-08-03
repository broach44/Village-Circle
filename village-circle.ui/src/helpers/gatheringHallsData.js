import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllGatheringHalls = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gatheringHalls`)
    .then((result) => {
      const gatheringHalls = result.data;
      resolve(gatheringHalls);
    })
    .catch((err) => reject(err));
});

const getGatheringHallById = (gatheringHallId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gatheringHalls/${gatheringHallId}`)
    .then((result) => {
      const gatheringHall = result.data;
      resolve(gatheringHall);
    })
    .catch((err) => reject(err));
});

const verifyMembership = (userId, gatheringHallId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gatheringHalls/memberVerify/${userId}/${gatheringHallId}`)
    .then((result) => {
      const isMember = result.data;
      resolve(isMember);
    })
    .catch((error) => reject(error));
});

const getGatheringHallsByUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gatheringHalls/owner/${userId}`)
    .then((result) => {
      const gatheringHalls = result.data;
      resolve(gatheringHalls);
    })
    .catch((error) => reject(error));
});

const joinGatheringHall = (memberInfo) => axios.post(`${baseUrl}/gatheringHalls/newMember`, memberInfo);

const createNewGatheringHall = (gatheringHallObj) => axios.post(`${baseUrl}/gatheringHalls`, gatheringHallObj);

export default {
  getAllGatheringHalls,
  getGatheringHallById,
  verifyMembership,
  joinGatheringHall,
  getGatheringHallsByUser,
  createNewGatheringHall,
};
