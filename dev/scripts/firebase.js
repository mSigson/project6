import firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD0RKYKqFA1LgrZR6ZU0FA23tx5NsSVBAI",
    authDomain: "marensigson-project6.firebaseapp.com",
    databaseURL: "https://marensigson-project6.firebaseio.com",
    projectId: "marensigson-project6",
    storageBucket: "marensigson-project6.appspot.com",
    messagingSenderId: "688195772960"
  };
  firebase.initializeApp(config);
  
export default firebase;