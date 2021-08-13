importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyD4upYJ2q9saUoqEbCtPx4Dv092ADU0KmA",
  authDomain: "standoffpay-48944.firebaseapp.com",
  projectId: "standoffpay-48944",
  storageBucket: "standoffpay-48944.appspot.com",
  messagingSenderId: "611600082712",
  appId: "1:611600082712:web:7b1790ccf0653135d1a06d",
  measurementId: "G-9P0RGV7LPS"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();