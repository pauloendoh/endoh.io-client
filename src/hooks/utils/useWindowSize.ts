import { useEffect, useState } from "react";
import theme from "utils/consts/theme";

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isSm: boolean;
  isSmMd: boolean;
}

// PE 3/3
export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isSm: false,
    isSmMd: false,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isSm: window.innerWidth <= theme.breakpoints.values.sm,
        isSmMd: window.innerWidth <= theme.breakpoints.values.md,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
