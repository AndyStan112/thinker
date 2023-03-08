import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../Components/header/Navbar';
import LogInCard from '../Components/auth/LogInCard';
import { Carousel } from 'flowbite-react';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const Home = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session }: { data: Session | null } = useSession();
  return (
    <>
      <Head>
        <title>Thinker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isOpen && <LogInCard setIsOpen={setIsOpen} />}
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center mt-2 bg-slate-300 w-fit p-3 gap-2 rounded-xl">
          <h1>Thinker</h1>
          <h2>Promoting thinking, not skimping. The future of learning.</h2>
          <h2>Thinker is the best tool to make learning fun by gamification</h2>
          <img className="w-40" src="Mascot.png" alt="Mascot" />
          <div className="flex">
            <button
              className="bg-slate-100 rounded-md mb-2 p-1"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Sign up now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps = () => {

// }

export default Home;
