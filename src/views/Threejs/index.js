import React from "react";

const Threejs = ({ props = ["pute"] }) => {
  return (
    <div id="ui-app " data-template="Threejs">
      Threejs in the base
      {props.map((e, i) => {
        return <h1 key={i}>{e}</h1>;
      })}
      <a href="/">HOME</a>
    </div>
  );
};

export default Threejs;
