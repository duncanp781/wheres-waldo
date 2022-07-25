import {useState, useEffect} from 'react';
import Waldo from './Waldo';
import Sidebar from './Sidebar';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAmk-GY_rGHT-uPjEruILZi6fJ6yy3t3s",
  authDomain: "wheres-waldo-98219.firebaseapp.com",
  projectId: "wheres-waldo-98219",
  storageBucket: "wheres-waldo-98219.appspot.com",
  messagingSenderId: "1063058259021",
  appId: "1:1063058259021:web:854e0d47914d45e7d07004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function App() {
  const [uid, setUid] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  async function addTime(name, time){
    try {
      const docRef = await addDoc(collection(db, "Times"), {
        time: time,
        name: name,
      })
      console.log("Document written with ID: ", docRef.id);
      setUid(docRef.id);

    }catch (e){
      console.error('Error adding time: ', e);
    }
  }

  useEffect(() => {
    async function getInfo(){
      const docRef = doc(db, "Times/" + uid);
      const docsnap = await getDoc(docRef);
      console.log("Doc snap:", docsnap.data());
    }

    uid && getInfo();
  
  }, [uid])

  return (
    <div className="App">
      <Waldo />
      <Sidebar />
    </div>
  );
}



export default App;
