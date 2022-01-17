import { useState } from "react";

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return { isHovering, handleMouseEnter, handleMouseLeave };
};

export default useHover;
