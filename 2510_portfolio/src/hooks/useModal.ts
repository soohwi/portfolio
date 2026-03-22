/**
 * hooks
 * useModal.tsx
**/

import { useState, Dispatch, SetStateAction } from "react";

export interface UseModalReturn<T> {
  isOpen: boolean;
  data: T | null;
  open: (data?: T) => void;
  close: () => void;
  setData: Dispatch<SetStateAction<T | null>>;
}

export function useModal<T = unknown>(): UseModalReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = (data?: T) => {
    setData(data ?? null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, data, open, close, setData };
}