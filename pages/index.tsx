import Head from 'next/head';
import { useState, useContext } from 'react';
import Navbar from '../Components/header/Navbar';
import LogInCard from '../Components/auth/LogInCard';
import { LandingPage } from 'Components/LandingPage';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { AppContext } from './_app';

const Home = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session }: { data: Session | null } = useSession();
  const {
    methods: { setCurrExp, setNextExp },
  } = useContext(AppContext);
  return (
    <>
      <Head>
        <title>Thinker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isOpen && <LogInCard setIsOpen={setIsOpen} />}
      <Navbar />
      <LandingPage session={session} />
      <button
        className="bg-slate-500 rounded-md"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Log in
      </button>
      <button
        className="bg-slate-500 rounded-md ml-10"
        onClick={() => {
          setCurrExp(0);
          setNextExp(0);
          signOut();
        }}
      >
        Log out
      </button>
    </>
  );
};

// export const getServerSideProps = () => {

// }

export default Home;
