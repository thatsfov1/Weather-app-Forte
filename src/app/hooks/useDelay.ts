import { useState, useEffect } from "react";

export const useDelay = (value: string, time = 400) => {
  const [delayed, setDelayed] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDelayed(value), time);
    return () => clearTimeout(handler);
  }, [value, time]);

  return delayed;
};
