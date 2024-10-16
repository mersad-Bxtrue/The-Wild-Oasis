import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // 1. Initialize state with value from localStorage or initialState
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key); // 2. Get value from localStorage
    return storedValue ? JSON.parse(storedValue) : initialState; // 3. Parse and return stored value or initialState
  });

  // 4. Update localStorage whenever value changes
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value)); // 5. Store value in localStorage
    },
    [value, key] // 6. Depend on value and key
  );

  return [value, setValue]; // 7. Return current value and setter function
}
