// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  remove,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp7VLfZvFVjg00UqiitNltuqdpF3ALF-w",
  authDomain: "sito-prova-920a5.firebaseapp.com",
  projectId: "sito-prova-920a5",
  storageBucket: "sito-prova-920a5.firebasestorage.app",
  messagingSenderId: "595506910744",
  appId: "1:595506910744:web:7a1aa7bdef7e015054156d",
  measurementId: "G-89CTG6NZ0V",
  databaseURL:
    "https://sito-prova-920a5-default-rtdb.europe-west1.firebasedatabase.app",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
let user;

const signBtn = document.getElementById("sign");
const logBtn = document.getElementById("log");
const delBtn = document.getElementById("del");

function writeUserCred(uid, email, pass) {
  let userData = {};
  userData = { uid, email, pass };
  update(ref(db, "users/" + uid), userData);
}

function getUserPass(uid) {
  const passRef = ref(db, "users/" + uid + "/pass");
  onValue(passRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

function deleteUserAcc(uid) {
  const userRef = ref(db, "users/" + uid);
  remove(userRef);
}

signBtn.addEventListener("click", function () {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed up
      user = userCredential.user;
      console.log("creating user...");
      writeUserCred(user.uid, email, pass);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
});

logBtn.addEventListener("click", function () {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      console.log("loggin in...", user);
      getUserPass(user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

delBtn.addEventListener("click", function () {
  event.preventDefault();
  deleteUserAcc(user.uid);
});
