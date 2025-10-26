// Put simple storage helpers here (members-only files under members/{uid}/)
async function uploadMemberFile(file, onProgress){
  const user = firebase.auth().currentUser;
  if(!user) throw new Error('Not authenticated');
  const key = `members/${user.uid}/${Date.now()}_${file.name}`;
  const ref = firebase.storage().ref().child(key);
  const uploadTask = ref.put(file);
  return new Promise((resolve,reject)=>{
    uploadTask.on('state_changed', snapshot => {
      if(onProgress){
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(pct);
      }
    }, err => reject(err), async () => {
      const url = await uploadTask.snapshot.ref.getDownloadURL();
      resolve({ key, url });
    });
  });
}

async function listMemberFiles(){
  const user = firebase.auth().currentUser;
  if(!user) throw new Error('Not authenticated');
  const listRef = firebase.storage().ref().child(`members/${user.uid}`);
  const res = await listRef.listAll();
  const items = await Promise.all(res.items.map(async it => ({ name: it.name, path: it.fullPath, url: await it.getDownloadURL() })));
  return items;

  const app = initializeApp(firebaseConfig);
  <script type="module"></script>
    // Import the functions you need from the SDKs you need
}const firebaseConfig = {
  apiKey: "AIzaSyB8Qz7pExampleKey123",
  authDomain: "my-social-reels.firebaseapp.com",
  projectId: "my-social-reels",
  storageBucket: "my-social-reels.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcd1234efgh5678",
  measurementId: "G-XYZ123ABC"
};
 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  // https://firebase.google.com/docs/web/setup#available-libraries
   // TODO: Add SDKs for Firebase products that you want to use
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // Check if login form exists (only runs on login page)
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = loginForm.email.value;
      const password = loginForm.password.value;

      // Firebase Auth login
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert(`Welcome back, ${user.email}!`);
          // Redirect to a members-only page after login
          window.location.href = '../reels.html';
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }

  // Check if signup form exists (for signup.html later)
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = signupForm.email.value;
      const password = signupForm.password.value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert(`Account created for ${user.email}`);
          window.location.href = 'login.html'; // redirect to login page
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }

  // Check user authentication status (for protecting pages)
  firebase.auth().onAuthStateChanged((user) => {
    const userStatus = document.getElementById('userStatus');
    if (userStatus) {
      userStatus.textContent = user ? `Logged in as ${user.email}` : 'Not logged in';
    }
  });

});
