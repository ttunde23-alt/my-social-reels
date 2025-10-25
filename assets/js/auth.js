// This file exposes simple auth helpers using Firebase compat SDK (loaded by each page)
async function initFirebase() {
  if (!window.firebase) { console.error('Firebase SDK not loaded'); return; }
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  window.auth = firebase.auth();
  window.storage = firebase.storage();
  window.firestore = firebase.firestore ? firebase.firestore() : null; // optional
  auth.onAuthStateChanged(user => window.dispatchEvent(new CustomEvent('authStateChanged',{detail:user})));
}

async function signUp(email, password){
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}
async function signIn(email, password){
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
async function signOutUser(){ return firebase.auth().signOut(); }

async function currentUser(){ return firebase.auth().currentUser; }
 const app = initializeApp(firebaseConfig);
<script type="module"></script>
  // Import the functions you need from the SDKs you need
const firebaseConfig = {
    apiKey: "AIzaSyDTG6WeUnp4IonF7rq9HPMbGKBkMFt583o",
    authDomain: "my-social-reels.firebaseapp.com",
    projectId: "my-social-reels",
    storageBucket: "my-social-reels.firebasestorage.app",
    messagingSenderId: "147742507021",
    appId: "1:147742507021:web:e1492b32d3e6f98b5d1544"
  }; import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
   // TODO: Add SDKs for Firebase products that you want to use
   