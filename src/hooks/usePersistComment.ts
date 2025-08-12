import { useEffect } from "react";

export const usePersistComment = ({
  value,
  key,
}: {
  value: string;
  key: string;
}) => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
};
