import isEqual from "lodash/isEqual";
import { useEffect, useState } from "react";

export const useHasChanged = <T>(originalValue: T) => {
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setHasChanged(false);
  }, [originalValue]);

  const validateHasChanged = (newValue: T) => {
    setHasChanged(!isEqual(originalValue, newValue));
  };

  return {
    hasChanged,
    validateHasChanged,
  };
};
