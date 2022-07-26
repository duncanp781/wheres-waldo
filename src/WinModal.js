import Modal from "./Modal";
import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import uniqid from 'uniqid';

const WinModal = (props) => {
  const [timeAdded, setTimeAdded] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTime(e.target[0].value, props.time);
    setTimeAdded(true);
    init();
  };

  const init = async () => {
    const timesRef = collection(props.db, "Times");
    const q = query(timesRef, orderBy("time"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setLeaderboard((leaderboard) => {
        return [...leaderboard, doc.data()];
      });
    });
  };

  return (
    <Modal>
      {!timeAdded ? (
        <div className="win-modal">
          <div className="win-text">
            Congrats you won in {props.time} seconds! Add your name to the
            leaderboard!
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="anonymous"></input>
            <button>Submit</button>
          </form>
        </div>
      ) : (
        <Leaderboard leaderboard={leaderboard} />
      )}
    </Modal>
  );
};

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h3>Best Times:</h3>
      {leaderboard.map((entry) => {
        console.log(entry);
        return (
          <div key = {uniqid()} className = 'leaderboard-time'>
            <span>{entry.name}</span>
            <span>{entry.time} seconds </span>
          </div>
        );
      })}
    </div>
  );
};

export default WinModal;
