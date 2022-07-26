import { useState, useEffect } from "react";
import Waldo from "./Waldo";
import Sidebar from "./Sidebar";
import WinModal from './WinModal'
import "./waldo-style.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAmk-GY_rGHT-uPjEruILZi6fJ6yy3t3s",
  authDomain: "wheres-waldo-98219.firebaseapp.com",
  projectId: "wheres-waldo-98219",
  storageBucket: "wheres-waldo-98219.appspot.com",
  messagingSenderId: "1063058259021",
  appId: "1:1063058259021:web:854e0d47914d45e7d07004",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [selection, setSelection] = useState(null);
  const [guess, setGuess] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0);

  async function addTime(name, time) {
    try {
      const docRef = await addDoc(collection(db, "Times"), {
        time: time,
        name: name,
      });
    } catch (e) {
      console.error("Error adding time: ", e);
    }
  }

  async function getAnswer(selection) {
    try {
      const docRef = doc(db, "answers/answers");
      const docSnap = await getDoc(docRef);
      return docSnap.data()[selection];
    } catch (e) {
      console.error("Failed to get answers with error", e);
    }
  }

  const getDist = (selection, guess, answer) => {
    let [rightX, rightY] = answer;
    let [guessX, guessY] = guess;
    let dist = Math.sqrt((rightX - guessX) ** 2 + (rightY - guessY) ** 2);
    return dist < 0.05;
  };


  const handleSelection = (name) => {
    name && setSelection(name);
  };

  const handleGuess = (guess) => {
    guess && setGuess(guess);
  };

  const submitGuess = async () => {
    let answer = await getAnswer(selection);
    let correct = selection && guess && getDist(selection, guess, answer);
    if (correct) {
      setCorrect(selection);
    }
  };

  const win = async (time) => {
    if (!won) {
      setWon(true);
      setTime(time);
    }
  };

  return (
    <div className="App">
      <Waldo guess={handleGuess} />
      <Sidebar
        select={handleSelection}
        guess={submitGuess}
        addCorrect={correct}
        win={win}
        won={won}
      />
      {won && <WinModal time = {time} addTime = {addTime} db = {db}/>}
    </div>
  );
}

export default App;
