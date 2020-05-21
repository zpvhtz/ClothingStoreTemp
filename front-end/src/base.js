import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA66S4WfD0ZYtK8hrsvgAx2zzQy13WilxQ",
    authDomain: "clothingstore-253109.firebaseapp.com",
    databaseURL: "https://clothingstore-253109.firebaseio.com",
    projectId: "clothingstore-253109",
    storageBucket: "clothingstore-253109.appspot.com",
    messagingSenderId: "399526618400",
    appId: "1:399526618400:web:dd64c4269416f42bf1e345",
    measurementId: "G-Z63EMKPG19"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;