import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiXuwLENEocTi3S_94XJIgt4-cYZ6cRc8",
  authDomain: "jackboylanprojectfirebase.firebaseapp.com",
  projectId: "jackboylanprojectfirebase",
  storageBucket: "jackboylanprojectfirebase.appspot.com",
  messagingSenderId: "24936446177",
  appId: "1:24936446177:web:4413a76615fa2ec5b55fa0"
}

firebase.initializeApp(firebaseConfig)
const firebaseFirestore = firebase.firestore();
const stockData = firebaseFirestore.collection("Sauces");



export const fetchProductsDB = async () => {
  const query = await stockData.get();
  return query.docs.map((doc) => {
    return doc.data();
  });
};

export {firebaseFirestore};