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
      <div className="flex flex-col justify-center">
        <section className="flex  flex-col items-center text-center w-full justify-center  bg-slate-300  p-3 gap-2 ">
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
        </section>
      <div className="bg-gray-100 ">
      <header className="bg-blue-500 text-white py-10 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Welcome to Tinker</h1>
          <p className="mt-2">Manage your tasks like quests and level up!</p>
        </div>
      </header>
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <img src="quests.svg" alt="Quest Icon" className="w-24 mx-auto" />
            <h2 className="text-xl font-bold mt-4">Quests</h2>
            <p className="mt-2">Organize your tasks into quests and track your progress.</p>
          </div>
          <div className="text-center">
            <img src="experience.svg" alt="Experience Icon" className="w-24 mx-auto" />
            <h2 className="text-xl font-bold mt-4">Experience</h2>
            <p className="mt-2">Earn experience points for completing tasks and level up.</p>
          </div>
          <div className="text-center">
            <img src="decks.svg" alt="Deck Icon" className="w-24 mx-auto" />
            <h2 className="text-xl font-bold mt-4">Decks and Flashcards (Work in Progress)</h2>
            <p className="mt-2">Create decks and flashcards to enhance your learning process.</p>
          </div>
          <div className="text-center">
            <img src="stats.svg" alt="Statistics Icon" className="w-24 mx-auto" />
            <h2 className="text-xl font-bold mt-4">Statistics</h2>
            <p className="mt-2">View your task and quest statistics over time.</p>
          </div>
          <div className="text-center">
            <img src="history.svg" alt="History Icon" className="w-24 mx-auto" />
            <h2 className="text-xl font-bold mt-4">History</h2>
            <p className="mt-2">Access a history of all completed tasks and quests.</p>
          </div>
          <div className="text-center">
            <img src="test.svg" alt="Test Icon" className="w-24 mx-auto" />
            <h2 className="text-xl font-bold mt-4">Finish Tests to Prove Your Knowledge (Work in Progress)</h2>
            <p className="mt-2">Take tests to assess your knowledge and progress.</p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-300 text-center py-4">
        <p>&copy; 2023 Tinker. All rights reserved.</p>
      </footer>
    </div>
      </div>
    </>
  );
};

// export const getServerSideProps = () => {

// }

export default Home;
