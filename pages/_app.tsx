import { MathJaxContext } from 'better-react-mathjax';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'styles/global.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <MathJaxContext><SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider></MathJaxContext>
    
  );
}
