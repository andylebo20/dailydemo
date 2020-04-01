import firebase from 'firebase'

// Your web app's Firebase configuration
/*var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };*/
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