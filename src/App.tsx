import React, { useState } from "react";
import { Pixi } from "./Pixi";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Pixi backgroundColor={0xff0000} />
    </div>
  );
}

export default App;
