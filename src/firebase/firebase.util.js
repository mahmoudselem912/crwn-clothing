import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCJbewzo9g1PfHM8cpdra_Dd578nMgIO2k",
    authDomain: "crwn-db-dc88d.firebaseapp.com",
    databaseURL: "https://crwn-db-dc88d.firebaseio.com",
    projectId: "crwn-db-dc88d",
    storageBucket: "crwn-db-dc88d.appspot.com",
    messagingSenderId: "782205460575",
    appId: "1:782205460575:web:84775e12ca19693b04bbea",
    measurementId: "G-NNGPQD6409"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()
    

    if(!snapShot.exists){
      const { displayName, email } = userAuth
      const createDate = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createDate,
          ...additionalData
        })
      }catch(error){
        console.log('error catching user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;