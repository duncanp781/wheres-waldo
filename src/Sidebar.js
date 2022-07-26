import waldo from "./waldo.webp";
import wenda from "./wenda.webp";
import whitebeard from "./whitebeard.webp";
import odlaw from "./odlaw.webp";
import { useState, useEffect } from "react";

const Sidebar = (props) => {
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [stop, setStop] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (props.addCorrect) {
      setCorrect((correct) => {
        return { ...correct, [props.addCorrect]: true };
      });
      setSelected(null);
    }
  }, [props.addCorrect]);

  const handleClick = (selection) => {
    if (!correct || !correct[selection]) {
      setSelected(selection);
    }
  };


  useEffect(() => {
    if (correct && Object.keys(correct).length === 4 && !props.won){
      props.win(time);
      setStop(true);
    }
  }, [correct, props, time])

  useEffect(() => {
    props.select(selected);
  }, [selected, props]);

  return (
    <div className="sidebar">
      <span>Click a character in the image when you have found it, and select below which character you have found!</span>
      <Timer stop = {stop} time = {time} setTime = {setTime}/>
      <Char
        img={waldo}
        charName={"Waldo"}
        click={handleClick}
        selected={selected}
        correct={correct}
      />
      <Char
        img={wenda}
        charName={"Wenda"}
        click={handleClick}
        selected={selected}
        correct={correct}
      />
      <Char
        img={whitebeard}
        charName={"Wizard Whitebeard"}
        click={handleClick}
        selected={selected}
        correct={correct}
      />
      <Char
        img={odlaw}
        charName="Odlaw"
        click={handleClick}
        selected={selected}
        correct={correct}
      />
      <button onClick={props.guess}>Submit Guess</button>
    </div>
  );
};

const Char = ({ img, charName, click, selected, correct }) => {
  let select = "";
  if (selected === charName) {
    select = "selected";
  }

  const handleClick = () => {
    click(charName);
  };
  return (
    <div
      className={
        `char ${select}` + (correct && correct[charName] ? "correct" : "")
      }
      onClick={handleClick}
    >
      <img src={img} alt={charName} className="sidebar-img" />
      <span>{charName}</span>
    </div>
  );
};

const Timer = ({ stop, setTime, time }) => {


  useEffect(() => {
      let timer;
      if(!stop && !timer){
        timer = setInterval(() => setTime((time) => time + 1), 1000);
      }else if (stop){
        timer && clearInterval(timer);
      }
      return () => clearInterval(timer);
  }, [stop, setTime, time]);

  return <div>Time: {time} seconds</div>;
};

export default Sidebar;
