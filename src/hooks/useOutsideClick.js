import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(); // 1. Create a ref to store the element

  useEffect(
    function () {
      function handleClick(e) {
        // 2. Check if click is outside the ref element
        if (ref.current && !ref.current.contains(e.target)) {
          handler(); // 3. Call handler if outside click
        }
      }

      function handleKeyDown(e) {
        // 4. Check if Escape key is pressed
        if (e.code === "Escape") {
          handler(); // 5. Call handler on Escape key
        }
      }

      // 6. Add event listeners for click and keydown
      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("keydown", handleKeyDown, listenCapturing);

      // 7. Cleanup event listeners on component unmount
      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.removeEventListener("keydown", handleKeyDown, listenCapturing);
      }
    },
    [handler, listenCapturing] // 8. Dependencies for useEffect
  );

  return ref; // 9. Return the ref
}
