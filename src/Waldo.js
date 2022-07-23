import React, {Component } from "react";
import waldo from "./waldo.jpg";
import "./waldo-style.css";

class Waldo extends Component{
  constructor(props){
    super(props);
    this.imgRef = React.createRef()
  }

  handleClick = (e) => {
    console.log('mouse coords', e.clientX, e.clientY);
    let coords = this.imgRef.current.getClientRects()[0]
    console.log('image', coords.x, coords.y);
    console.log('Relative Coords: ', e.clientX - coords.x, e.clientY - coords.y)
  }
  render() {
    return (
      <div className="waldo">
        <div>
          sPace
        </div>
        <div>
          More SPace
        </div>
        <img
          onClick={this.handleClick}
          src={waldo}
          alt="Where's waldo?"
          ref = {this.imgRef}
        />
      </div>
    );
  }
};

export default Waldo;
