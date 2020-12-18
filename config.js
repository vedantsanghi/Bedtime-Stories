import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA8MPXoUVvVFoR2x9ItbiCxm_JoSIt6nn4",
    authDomain: "story-hub-6f1ff.firebaseapp.com",
    databaseURL: "https://story-hub-6f1ff.firebaseio.com",
    projectId: "story-hub-6f1ff",
    storageBucket: "story-hub-6f1ff.appspot.com",
    messagingSenderId: "128504671696",
    appId: "1:128504671696:web:5d6cfe29235906ea9b5dd5",
    measurementId: "G-JVM7KE9TFR"
};



  firebase.initializeApp(firebaseConfig);


export default  firebase.database()