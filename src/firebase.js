import firebase from 'firebase';

var config = {
    apiKey: 'AIzaSyAQ3TcbgAqM7AWmxZurkVsDvIbK3raiEP4',
    authDomain: 'luffarschack-cd7ed.firebaseapp.com',
    databaseURL: 'https://luffarschack-cd7ed.firebaseio.com',
    projectId: 'luffarschack-cd7ed',
    storageBucket: '',
    messagingSenderId: '1032797523654'
  };
  firebase.initializeApp(config);

export default firebase;