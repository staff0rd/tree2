import React, { useEffect, useState } from "react";
import { Pixi } from "./Pixi";
import { yellow } from "@mui/material/colors";
import * as PIXI from "pixi.js";
import "./react-dat-gui.css";
import DatGui, { DatNumber, DatFolder, DatButton } from "react-dat-gui";
import { draw, foliage, initial, randomize, trunkSegments } from "./draw";

function App() {
  const [app, setApp] = useState<PIXI.Application>();
  const [data, setData] = useState(initial);

  const handleUpdate = (newData: any) => {
    setData({ ...data, ...newData });
  };

  useEffect(() => {
    if (app) {
      draw(app, data);
    }
  }, [data, app]);

  const render = (Component: any, props: any) => (
    <Component {...{ ...props, component: undefined }} />
  );

  return (
    <div className="App">
      <div>
        <DatGui data={data} onUpdate={handleUpdate}>
          {/* <DatNumber label="Seed" path="seed" max={9999} min={0} step={1} /> */}
          <DatButton
            label="Randomize"
            onClick={() => {
              const newData = randomize();
              console.log(JSON.stringify(newData, null, 2));
              handleUpdate(newData);
            }}
          />
          <DatFolder title="Foliage" closed={false}>
            {Object.entries(foliage).map(([key, value], ix) =>
              render(value.component, { ...value, path: key, key: ix })
            )}
          </DatFolder>
          <DatFolder title="Trunk Segments" closed={false}>
            {Object.entries(trunkSegments).map(([key, value], ix) =>
              render(value.component, { ...value, path: key, key: ix })
            )}
          </DatFolder>
        </DatGui>
      </div>
      <Pixi
        backgroundColor={PIXI.utils.string2hex(yellow["100"])}
        onAppChange={setApp}
        onResized={() => app && draw(app, data)}
      />
    </div>
  );
}

export default App;
