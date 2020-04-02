import firebase from 'firebase'

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDG3goJB9T9DQzoeY56SxFYyebVp9HCuj0",
    authDomain: "dailydashboard-80ccc.firebaseapp.com",
    databaseURL: "https://dailydashboard-80ccc.firebaseio.com",
    projectId: "dailydashboard-80ccc",
    storageBucket: "dailydashboard-80ccc.appspot.com",
    messagingSenderId: "19890360437",
    appId: "1:19890360437:web:06ac7f9b1fc46c853ba83c",
    measurementId: "G-X44BZG74J5"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase