import React from "react";
import * as ReactDOM from "react-dom/client";
const RenderApp = () => {
  const [x, setx] = React.useState(0);

  return (
    <div id="ui-app" onClick={() => setx(5)}>
      YOOOOOOOOOOOOOOOO ${x}
    </div>
  );
};

const HydrateApp = () => {
  return ReactDOM.hydrateRoot(document.getElementById("root"), <RenderApp />);
};
export { RenderApp, HydrateApp };
