import React, { useEffect, useState } from "react";
import { Pixi } from "./Pixi";
import { yellow, brown } from "@mui/material/colors";
import * as PIXI from "pixi.js";
import { range } from "lodash";
import "./react-dat-gui.css";
import DatGui, { DatColor, DatNumber, DatFolder } from "react-dat-gui";

function App() {
  const [app, setApp] = useState<PIXI.Application>();
  const [data, setData] = useState({
    package: "react-dat-gui",
    trunkSegments: 2,
    isAwesome: true,
    trunkColor: brown[500],
    trunkSegmentWidth: 50,
    trunkSegmentHeight: 100,
  });

  const handleUpdate = (newData: any) => {
    setData({ ...data, ...newData });
  };

  useEffect(() => {
    draw();
  }, [data, app]);

  const draw = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (app && app.stage) {
      app.stage.removeChildren();
      range(0, data.trunkSegments).forEach((ix) => {
        const g = new PIXI.Graphics()
          .beginFill(PIXI.utils.string2hex(data.trunkColor))
          .drawRect(0, 0, data.trunkSegmentWidth, data.trunkSegmentHeight);
        g.pivot.set(data.trunkSegmentWidth / 2, data.trunkSegmentHeight);
        g.position.set(width / 2, height - data.trunkSegmentHeight * ix);
        console.log(g.position, g.pivot, g.width, g.height);
        app.stage.addChild(g);
      });
    }
  };

  return (
    <div className="App">
      <div>
        <DatGui data={data} onUpdate={handleUpdate}>
          <DatFolder title="Trunk Segment" closed={false}>
            <DatNumber
              path="trunkSegments"
              label="Count"
              min={1}
              max={10}
              step={1}
            />
            <DatNumber
              path="trunkSegmentWidth"
              label="Width"
              min={25}
              max={100}
              step={1}
            />
            <DatNumber
              path="trunkSegmentHeight"
              label="Height"
              min={50}
              max={250}
              step={1}
            />
            <DatColor path="trunkColor" label="Color" />
          </DatFolder>
        </DatGui>
      </div>
      <Pixi
        backgroundColor={PIXI.utils.string2hex(yellow["100"])}
        onAppChange={setApp}
        onResized={() => draw()}
      />
    </div>
  );
}

export default App;
