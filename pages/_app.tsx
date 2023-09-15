import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'styles/global.css';
import Navbar from '@/Components/header/Navbar';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
       <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
    
  );
}
