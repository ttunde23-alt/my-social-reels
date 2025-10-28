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
  }; 

  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
   // TODO: Add SDKs for Firebase products that you want to use
   if (isAdmin(user)) {
  adminPanel.style.display = "block";
  document.getElementById("adminProducts").style.display = "block";
  await loadAllMemberReels();
  await loadAdminProducts();
} else {
  adminPanel.style.display = "none";
  document.getElementById("adminProducts").style.display = "none";
  await loadUserReels(user);
}
