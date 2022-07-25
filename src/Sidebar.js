import "./waldo-style.css";
import waldo from "./waldo.webp";
import wenda from "./wenda.webp";
import whitebeard from "./whitebeard.webp";
import odlaw from "./odlaw.webp";
import { useState, useEffect } from "react";

const Sidebar = (props) => {
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);

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
    props.select(selected);
  }, [selected, props]);

  return (
    <div className="sidebar">
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
      className={`char ${select}` + (correct && correct[charName] ? "correct" : "")}
      onClick={handleClick}
    >
      <img src={img} alt={charName} className="sidebar-img" />
      <span>{charName}</span>
    </div>
  );
};

export default Sidebar;
