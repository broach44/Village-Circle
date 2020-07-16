import firebase from 'firebase';
import 'firebase/auth';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token'); if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  } return request;
}, (err) => Promise.reject(err));

const loginUser = () => {
  const provider = new firebase.auth.EmailAuthProvider();
  firebase.auth().signInWithEmailAndPassword(provider).then((cred) => {
    // get token from firebase
    cred.user.getIdToken()
    // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token));
  });
};

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

export default { getUid, logoutUser, loginUser };
