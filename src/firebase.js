import firebase from "firebase";

//initialize database

var Config = {
  apiKey: "AIzaSyDlV5vHhK64qoH5lmjZJK_hSXmrrDKWANw",
  authDomain: "todo-list-app-a53d9.firebaseapp.com",
  databaseURL: "https://todo-list-app-a53d9.firebaseio.com",
  projectId: "todo-list-app-a53d9",
  storageBucket: "todo-list-app-a53d9.appspot.com",
  messagingSenderId: "900152982704",
  appId: "1:900152982704:web:1c4ea8e68584a7294b4f75",
  measurementId: "G-C44RYTBSGM"
};

//initialize firebase

firebase.initializeApp(Config);
firebase.analytics();

export default firebase;
