import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAHuWwuyrdO5qMI_T45HVeymtE5u-hQj6E",
  authDomain: "atom-hacks.firebaseapp.com",
  projectId: "atom-hacks",
  storageBucket: "atom-hacks.appspot.com",
  messagingSenderId: "1026836254209",
  appId: "1:1026836254209:web:97f37823a7944dfd0eba00"
});

export const db = firebaseApp.firestore();

export default firebaseApp;