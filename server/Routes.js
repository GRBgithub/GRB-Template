import Home from "../src/views/Home";
import Threejs from "../src/views/Threejs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import "isomorphic-fetch";
/*---------------------------------------------------------------
    GET PROPS MAKE CALL API TO RENDER IN THE COMPONENT TO RENDER
-----------------------------------------------------------------*/
const Routes = [
  {
    path: "/",
    Component: Home,
    manager: [],
    GetProps: () => {
      return fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => {
          return { array: ["salope"], title: json.title };
        });
    },
  },
  {
    path: "/Threejs",
    manager: [],
    Component: Threejs,
    GetProps: () => {
      return ["PUTE", "SALOPE"];
    },
  },
];

/*-----------------------------------------------------------------------------
    DO NOT TOUCH PROMISES TO RENDER PLAIN HTML FROM REACT AS TEMPLATE ENGINE
-------------------------------------------------------------------------------*/
const hikkary = () => {
  return "<div>404</div>";
};
const GetRoutes = (attribute) => {
  let Route = {};
  Routes.forEach((element) => {
    if (element.path && element.path === attribute) {
      Route = element;
    }
  });
  if (Route.GetProps) {
    const promises = Route.GetProps();
    return Promise.all([promises]).then(([data]) => {
      return ReactDOMServer.renderToString(<Route.Component props={data} />);
    });
  } else {
    const promises = hikkary();
    return Promise.all([promises]).then(([data]) => {
      return data;
    });
  }
};

export default GetRoutes;
