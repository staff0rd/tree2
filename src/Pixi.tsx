import * as PIXI from "pixi.js";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useResizeListener } from "./useResizeListener";

interface PixiProps {
  backgroundColor?: number;
  onAppChange?: (app: PIXI.Application) => void;
}

const styles = {
  pixi: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
  },
};

export const Pixi = ({ backgroundColor, onAppChange }: PixiProps) => {
  const [app, setApp] = useState<PIXI.Application>();
  const pixiElement = useRef<HTMLDivElement>(null);

  const resize = (pixi: PIXI.Application) => {
    if (pixiElement.current) {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      pixi.renderer.resize(size.width, size.height);
      console.log(`resized pixi to ${size.width}x${size.height}`);
    }
  };

  const onResize = useCallback(() => {
    if (app) {
      resize(app);
    } else {
      console.log("no app to resize");
    }
  }, [app]);

  useEffect(() => {
    app && app.destroy(true);
    const pixi = new PIXI.Application({
      backgroundColor: backgroundColor || 0xffffff,
    });
    resize(pixi);
    setApp(pixi);
    onAppChange && onAppChange(pixi);
  }, [backgroundColor]);

  useEffect(() => {
    const element = pixiElement.current;
    if (element && app) {
      element.appendChild(app.view);
      onResize();
    }
  }, [app, pixiElement.current]);

  useResizeListener(onResize);

  return <div id="pixi-root" style={styles.pixi} ref={pixiElement} />;
};
