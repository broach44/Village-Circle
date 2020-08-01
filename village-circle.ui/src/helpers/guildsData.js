import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getAllGuilds = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/guilds`)
    .then((result) => {
      const guilds = result.data;
      resolve(guilds);
    })
    .catch((err) => reject(err));
});

const getGuildById = (guildId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/guilds/${guildId}`)
    .then((result) => {
      const guild = result.data;
      resolve(guild);
    })
    .catch((err) => reject(err));
});

const verifyMembership = (userId, guildId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/guilds/memberverify/${userId}/${guildId}`)
    .then((result) => {
      const isMember = result.data;
      resolve(isMember);
    })
    .catch((error) => reject(error));
});

const getGuildsByUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/guilds/owner/${userId}`)
    .then((result) => {
      const guilds = result.data;
      resolve(guilds);
    })
    .catch((error) => reject(error));
});

const getMemberListOfGuild = (guildId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/guildMembers/${guildId}`)
    .then((result) => {
      const members = result.data;
      resolve(members);
    })
    .catch((error) => reject(error));
});

const joinGuild = (memberInfo) => axios.post(`${baseUrl}/guilds/newMember`, memberInfo);

const createNewCircle = (guildObj) => axios.post(`${baseUrl}/guilds`, guildObj);

export default {
  getAllGuilds,
  getGuildById,
  verifyMembership,
  joinGuild,
  getGuildsByUser,
  createNewCircle,
  getMemberListOfGuild,
};
