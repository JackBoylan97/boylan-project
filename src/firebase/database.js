//FIRESTORE BACKEND

//importing main functions from firestore installations
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//setting personal details for firestore access
const firebaseConfig = {
  apiKey: "----------------------------------",
  authDomain: "jackboylanprojectfirebase.firebaseapp.com",
  projectId: "jackboylanprojectfirebase",
  storageBucket: "jackboylanprojectfirebase.appspot.com",
  messagingSenderId: "24936446177",
  appId: "1:24936446177:web:4413a76615fa2ec5b55fa0",
};

//initialize firebase function
firebase.initializeApp(firebaseConfig);
const firebaseFirestore = firebase.firestore();
//base query function for accessing sauces
const stockData = firebaseFirestore.collection("Sauces");
//base query function for accessing user orders
const orderData = firebaseFirestore.collection("Orders");
//base query function for accessing user submitted forms
const contactData = firebaseFirestore.collection("ContactForms");

/* FIRESTORE METHODS 
these methods are all queried by importing into the component using it
*/

//Push order details to database
export const pushOrder = async (formObject) => {
  return orderData.add(formObject);
};
//Push customer form to database
export const customerForm = async (submission) => {
  debugger;
  return contactData.add(submission);
};

//Update the stock of products purchased
export const updateStock = async (basket) => {
  //for every product in basket
  for (var i of basket) {
    console.log(i.quantity);
    //set decrement method, decrement by the product quantity value
    const decrement = firebase.firestore.FieldValue.increment(-i.quantity);
    const promises = [];
    //query = result of stock data where the id field is equal to product ID
    const query = stockData.where("id", "==", i.id);
    //get the collection with the ID equal to product ID
    query.get().then((snapshots) => {
      snapshots.forEach((snapshot) => {
        //decrease the stock value by the product quantity vlaue
        promises.push(snapshot.ref.update({ stock: decrement }));
      });
      return Promise.all(promises);
    });
  }
};
/*When an order is made, an ID is created for the collection that stores that number 
  this method fetches the ID, to display to the user
*/

export const fetchOrderNum = async (number) => {
  const query = await orderData.where("cardholder.number", "==", number).get();
  return query.docs.map((doc) => {
    return doc.id;
  });
};
//Fetch all products from database
export const fetchProductsDB = async () => {
  const query = await stockData.get();
  return query.docs.map((doc) => {
    return doc.data();
  });
};

export { firebaseFirestore };
