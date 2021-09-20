import * as PIXI from "pixi.js";
import { range } from "lodash";
import { brown, green } from "@mui/material/colors";
import { DatColor, DatNumber } from "react-dat-gui";
import * as rng from "./random";

export const initial = {
  trunkSegments: 2,
  trunkColor: brown[500] as string,
  trunkSegmentWidth: 50,
  trunkSegmentHeight: 100,
  foliageColor: green[700] as string,
  foliageWidth: 100,
  foliageHeight: 100,
  foliageOpacity: 0.5,
};

interface IBetween {
  min: number;
  max: number;
  step: number;
}
const between = (b: IBetween) => rng.pick(range(b.min, b.max, b.step));
export type Data = typeof initial;

export const randomize = (): Data => ({
  trunkSegments: between(trunkSegments.trunkSegments),
  trunkColor: brown[`${rng.pick(range(100, 900, 100))}` as keyof typeof brown],
  trunkSegmentWidth: between(trunkSegments.trunkSegmentWidth),
  trunkSegmentHeight: between(trunkSegments.trunkSegmentHeight),
  foliageColor:
    green[`${rng.pick(range(100, 900, 100))}` as keyof typeof green],
  foliageWidth: between(foliage.foliageWidth),
  foliageHeight: between(foliage.foliageHeight),
  foliageOpacity: between(foliage.foliageOpacity),
});

export const foliage = {
  foliageWidth: {
    component: DatNumber,
    label: "Width",
    min: 200,
    max: 500,
    step: 1,
  },
  foliageHeight: {
    component: DatNumber,
    label: "Height",
    min: 200,
    max: 500,
    step: 1,
  },
  foliageOpacity: {
    component: DatNumber,
    label: "Opacity",
    min: 0.5,
    max: 1,
    step: 0.01,
  },
  foliageColor: {
    component: DatColor,
    label: "Color",
  },
};

export const trunkSegments = {
  trunkSegments: {
    component: DatNumber,
    label: "Count",
    min: 1,
    max: 4,
    step: 1,
  },
  trunkSegmentWidth: {
    component: DatNumber,
    label: "Width",
    min: 25,
    max: 100,
    step: 1,
  },
  trunkSegmentHeight: {
    component: DatNumber,
    label: "Height",
    min: 50,
    max: 250,
    step: 1,
  },
  trunkColor: {
    component: DatColor,
    label: "Color",
  },
};

export const draw = (app: PIXI.Application, data: Data) => {
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
      app.stage.addChild(g);
    });
    const g = new PIXI.Graphics()
      .beginFill(PIXI.utils.string2hex(data.foliageColor), data.foliageOpacity)
      .drawRect(0, 0, data.foliageWidth, data.foliageHeight);
    g.pivot.set(g.width / 2, g.height / 2);
    g.position.set(
      width / 2,
      height - data.trunkSegmentHeight * data.trunkSegments
    );
    app.stage.addChild(g);
  }
};
