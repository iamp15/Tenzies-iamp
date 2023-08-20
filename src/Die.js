import React from "react";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59e391" : "white",
  };

  return (
    <div className="die" onClick={props.holdDice} style={style}>
      {props.value}
    </div>
  );
}
