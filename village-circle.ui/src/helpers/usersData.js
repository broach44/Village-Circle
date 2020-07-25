import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getSingleUserData = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${uid}`)
    .then((result) => {
      const user = result.data;
      resolve(user);
    })
    .catch((err) => reject(err));
});

const getUserPosts = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/messages/userPosts/${userId}`)
    .then((result) => {
      const postInfo = result.data;
      resolve(postInfo);
    })
    .catch((err) => reject(err));
});

const getChildren = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/children/${userId}`)
    .then((result) => {
      const children = result.data;
      resolve(children);
    })
    .catch((err) => reject(err));
})

export default { getSingleUserData, getUserPosts, getChildren };
