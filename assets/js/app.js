// Import Firebase modules (for Firebase v9+ modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB8Qz7pExampleKey123",
  authDomain: "my-social-reels.firebaseapp.com",
  projectId: "my-social-reels",
  storageBucket: "my-social-reels.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcd1234efgh5678",
  measurementId: "G-XYZ123ABC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// ===============================
// AUTHENTICATION HANDLING
// ===============================

// Login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert(`Welcome back, ${userCredential.user.email}!`);
        window.location.href = '../reels.html'; // redirect after login
      } catch (error) {
        alert(error.message);
      }
    });
  }

  // Signup
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = signupForm.email.value;
      const password = signupForm.password.value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert(`Account created for ${userCredential.user.email}`);
        window.location.href = 'login.html';
      } catch (error) {
        alert(error.message);
      }
    });
  }

  // Auth state check
  onAuthStateChanged(auth, (user) => {
    const userStatus = document.getElementById('userStatus');
    if (userStatus) {
      userStatus.textContent = user ? `Logged in as ${user.email}` : 'Not logged in';
    }
  });
});

// ===============================
// STORAGE HANDLING (members-only)
// ===============================

// Upload a file for the logged-in member
export async function uploadMemberFile(file, onProgress) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const key = `members/${user.uid}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, key);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', snapshot => {
      if (onProgress) {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(pct);
      }
    }, err => reject(err), async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      resolve({ key, url });
    });
  });
}

// List uploaded files for the logged-in member
export async function listMemberFiles() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const listRef = ref(storage, `members/${user.uid}`);
  const res = await listAll(listRef);
  const items = await Promise.all(res.items.map(async (it) => ({
    name: it.name,
    path: it.fullPath,
    url: await getDownloadURL(it)
  })));
  return items;
}
