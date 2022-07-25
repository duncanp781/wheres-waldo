import "./waldo-style.css";
import waldo from './waldo.webp';
import wenda from './wenda.webp';
import whitebeard from './whitebeard.webp';
import odlaw from './odlaw.webp';

const Sidebar = (props) => {
  return <div className="sidebar">
    <Char img = {waldo} charName = {'Waldo'}/>
  <Char img = {wenda} charName = {'Wenda'}/>
  <Char img = {whitebeard} charName = {'Wizard Whitebeard'}/>
  <Char img = {odlaw} charName = 'Odlaw'/>
  </div>;
};

const Char = ({img, charName}) => {

  return <div>
    <img src = {img} alt = {charName} className = 'sidebar-img'/>
    <span>{charName}</span>
  </div>

}



export default Sidebar;
