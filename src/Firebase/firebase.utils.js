import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

  const Config = {
    apiKey: "AIzaSyADZgB4WXGhnWn8dog926H4i7xDxz5TXWk",
    authDomain: "project-with-db.firebaseapp.com",
    databaseURL: "https://project-with-db.firebaseio.com",
    projectId: "project-with-db",
    storageBucket: "project-with-db.appspot.com",
    messagingSenderId: "37373940583",
    appId: "1:37373940583:web:f99b76406e3444e3a495c2",
    measurementId: "G-KXBVTYDM7H"
  };

export const CreateUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(`${error} User Can't be registered`);
    }
  }
  return userRef;
};

firebase.initializeApp(Config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
