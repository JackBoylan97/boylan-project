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
const contactData = firebaseFirestore.collection("ContactForms")

export const pushOrder = async (formObject) => {
  return orderData.add(formObject);
};
export const customerForm = async (submission)=>{
  debugger
  return contactData.add(submission);
}

export const updateStock = async (basket) => {
  for (var i of basket) {
    console.log(i.quantity)
    const decrement = firebase.firestore.FieldValue.increment(-i.quantity);
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

export const fetchOrderNum = async (number)=> {
  const query = await orderData.where("cardholder.number","==", number).get();
  return query.docs.map((doc)=>{
    return doc.id;
  })
}

export const fetchProductsDB = async () => {
  const query = await stockData.get();
  return query.docs.map((doc) => {
    return doc.data();
  });
};

export { firebaseFirestore };
