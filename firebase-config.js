const firebaseConfig = {
  apiKey: "AIzaSyA3MgADnkr177SY2mmPT40OcyZJvOidmbQ",
  authDomain: "photoboth-masakecil.firebaseapp.com",
  databaseURL: "https://photoboth-masakecil-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "photoboth-masakecil",
  storageBucket: "photoboth-masakecil.firebasestorage.app",
  messagingSenderId: "412246012278",
  appId: "1:412246012278:web:3866bc542b6cc58a0aca57",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();
