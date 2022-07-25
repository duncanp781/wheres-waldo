import React, {Component } from "react";
import waldo from "./waldo-hard.jpeg";
import "./waldo-style.css";

class Waldo extends Component{
  constructor(props){
    super(props);
    this.imgRef = React.createRef()
    this.state = {
      clickCoords: null,
      circle: null,
    }
  }

  handleClick = (e) => {
    let coords = this.getRelCoords(e)
    this.setState({
      clickCoords: coords,
    });
  }


  getRelCoords = (e) => {
    let imgInfo = this.imgRef.current.getClientRects()[0]
    let [relX, relY] = [e.clientX - imgInfo.x, e.clientY - imgInfo.y];
    let [w,h] = [imgInfo.width, imgInfo.height];
    return [relX/w, relY/h];
  }

  reltoAbs(rel){
    console.log(rel);
    let [relX, relY] = rel;
    let imgInfo = this.imgRef.current.getClientRects()[0];
    let [w,h] = [imgInfo.width, imgInfo.height];
    return [relX*w + imgInfo.x, relY*h + imgInfo.y]
  }

  render() {
    let absCoords = this.state.clickCoords && this.reltoAbs(this.state.clickCoords);
    let circle = absCoords && {
      x: absCoords[0],
      y: absCoords[1],
      r: 6
    }
    return (
      <div className="waldo">
        {this.state.clickCoords && <Circle circle = {circle}/>}
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

const Circle = ({circle}) => {
  let {x,y,r} = circle;
  return (
    
    <div className = 'circle' style = {{
      borderRadius: '100%',
      border: '3px solid black',
      position: 'absolute',
      width: `${r}vw`,
      height: `${r}vw`,
      transform : 'translateY(-50%) translateX(-50%)',
      top: `${y}px`,
      left: `${x}px`,
    }}>

    </div>
  )

}

export default Waldo;
