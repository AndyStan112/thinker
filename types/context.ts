import { Dispatch, SetStateAction } from 'react';
export type AppContextType = {
  currExp?: number;
  nextExp?: number;
  level?: number;
  methods: {
    setCurrExp?: Dispatch<SetStateAction<number>>;
    setNextExp?: Dispatch<SetStateAction<number>>;
    setLevel?: Dispatch<SetStateAction<number>>;
  };
} | null;
