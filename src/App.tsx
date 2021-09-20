import React, { useState } from "react";
import { Pixi } from "./Pixi";
import { yellow } from "@mui/material/colors";
import * as PIXI from "pixi.js";

import "./react-dat-gui.css";
import DatGui, {
  DatBoolean,
  DatColor,
  DatNumber,
  DatString,
} from "react-dat-gui";

function App() {
  const [data, setData] = useState({
    package: "react-dat-gui",
    power: 9000,
    isAwesome: true,
    feelsLike: "#2FA1D6",
  });
  const handleUpdate = (newData: any) => {
    setData({ ...data, ...newData });
  };
  return (
    <div className="App">
      <div>
        <DatGui data={data} onUpdate={handleUpdate}>
          <DatString path="package" label="Package" />
          <DatNumber
            path="power"
            label="Power"
            min={9000}
            max={9999}
            step={1}
          />
          <DatBoolean path="isAwesome" label="Awesome?" />
          <DatColor path="feelsLike" label="Feels Like" />
        </DatGui>
      </div>
      <Pixi backgroundColor={PIXI.utils.string2hex(yellow["100"])} />
    </div>
  );
}

export default App;
