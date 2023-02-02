import { Dispatch, SetStateAction } from 'react';
export type AppContextType = {
  currExp?: number;
  nextExp?: number;
  methods: {
    setCurrExp?: Dispatch<SetStateAction<number>>;
    setNextExp?: Dispatch<SetStateAction<number>>;
  };
} | null;
