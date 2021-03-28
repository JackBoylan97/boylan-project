import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiXuwLENEocTi3S_94XJIgt4-cYZ6cRc8",
  authDomain: "jackboylanprojectfirebase.firebaseapp.com",
  projectId: "jackboylanprojectfirebase",
  storageBucket: "jackboylanprojectfirebase.appspot.com",
  messagingSenderId: "24936446177",
  appId: "1:24936446177:web:4413a76615fa2ec5b55fa0",
};

firebase.initializeApp(firebaseConfig);
const firebaseFirestore = firebase.firestore();
const stockData = firebaseFirestore.collection("Sauces");
const orderData = firebaseFirestore.collection("Orders");

export const pushOrder = async (formObject) => {
  return orderData
    .doc(formObject.orderId)
    .collection("details")
    .add(formObject);
};

export const updateStock = async (basket) => {
  console.log(basket);
  for (var i of basket) {
    console.log(i);
    const decrement = firebase.firestore.FieldValue.increment(-i.quantity);
    debugger;
    const promises = []
    const query = stockData.where("id", "==", i.id);
    query.get().then(snapshots => {
      snapshots.forEach(snapshot=>{
          promises.push(snapshot.ref.update({stock: decrement }))
      })
      return Promise.all(promises)
    })
  }
};

export const fetchProductsDB = async () => {
  const query = await stockData.get();
  return query.docs.map((doc) => {
    return doc.data();
  });
};

export { firebaseFirestore };
