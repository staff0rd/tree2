import { useEffect } from "react";

export const useResizeListener = (onResize: any) => {
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);
};
