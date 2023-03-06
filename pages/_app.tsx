import { SessionProvider } from 'next-auth/react';
import { createContext, useState, useEffect } from 'react';
import { AppContextType } from '@/types/context';
import type { AppProps } from 'next/app';
import 'styles/global.css';
export const AppContext = createContext<AppContextType>(null);
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [currExp, setCurrExp] = useState(0);
  const [nextExp, setNextExp] = useState(0);
  const [level, setLevel] = useState(0);
  return (
    <AppContext.Provider
      value={{
        currExp,
        nextExp,
        level,
        methods: { setNextExp, setCurrExp, setLevel },
      }}
    >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AppContext.Provider>
  );
}
