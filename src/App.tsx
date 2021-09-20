import React, { useState } from "react";
import { Pixi } from "./Pixi";
import { yellow } from "@mui/material/colors";
import * as PIXI from "pixi.js";

function App() {
  return (
    <div className="App">
      <Pixi backgroundColor={PIXI.utils.string2hex(yellow["100"])} />
    </div>
  );
}

export default App;
