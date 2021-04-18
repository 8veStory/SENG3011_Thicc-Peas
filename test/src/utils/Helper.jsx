import { useEffect, useRef } from "react";

/**
 * Returns the value from the previous render cycle.
 * idk i got it from here https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}