import firebase from 'firebase';
import 'firebase/auth';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  } return request;
}, (err) => Promise.reject(err));

const loginUser = (user) => {
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((cred) => {
    // get token from firebase
    cred.user.getIdToken()
    // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token));
  });
};

// const registerUser = (user) => {
//   return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(cred => {
//     const userInfo = {email: cred.user.email};
//     cred.user.getIdToken()
//       .then((token) => sessionStorage.setItem('token', token));
//     // below will be added for the post to api
//     // .then(() => axios.post(`${baseUrl}/users`, userInfo));
//   })
// }

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

export default { getUid, logoutUser, loginUser };
