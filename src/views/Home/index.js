import React from "react";

const Home = (props) => {
  const data = { array: ["pute"], title: "test ", ...props };
  return (
    <div id="ui-app" data-template="Home">
      <div className="fullbox center column">
        <a href="/Threejs">THREEJS</a>
      </div>
    </div>
  );
};

export default Home;
