import "./waldo-style.css";
import waldo from "./waldo.webp";
import wenda from "./wenda.webp";
import whitebeard from "./whitebeard.webp";
import odlaw from "./odlaw.webp";
import { useState, useEffect } from "react";

const Sidebar = (props) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (selection) => {
    setSelected(selection);
  };

  useEffect(() => {
    props.select(selected);
  }, [selected, props])

  return (
    <div className="sidebar">
      <Char
        img={waldo}
        charName={"Waldo"}
        click={handleClick}
        selected={selected}
      />
      <Char
        img={wenda}
        charName={"Wenda"}
        click={handleClick}
        selected={selected}
      />
      <Char
        img={whitebeard}
        charName={"Wizard Whitebeard"}
        click={handleClick}
        selected={selected}
      />
      <Char
        img={odlaw}
        charName="Odlaw"
        click={handleClick}
        selected={selected}
      />
      <button onClick = {props.guess}>Submit Guess</button>
    </div>
  );
};

const Char = ({ img, charName, click, selected }) => {
  let select = '';
  if (selected === charName){
    select = 'selected'
  }

  const handleClick = () => {
    click(charName);
  }
  return (
    <div className= {`char ${select}`} onClick={handleClick}>
      <img src={img} alt={charName} className="sidebar-img" />
      <span>{charName}</span>
    </div>
  );
};

export default Sidebar;
