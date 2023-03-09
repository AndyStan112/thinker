import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Table } from 'flowbite-react';
import { DateRangePicker } from 'react-date-range';
import { useEffect, useState } from 'react';
import Navbar from '@/Components/header/Navbar';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const Stats = () => {
  const { data: session }: { data: Session | null } = useSession();
  const [events, setEvents] = useState([]);
  const [totalExperience, setTotalExperience] = useState(0);
  useEffect(() => {
    if (session)
      fetch('/api/history/get/' + session.id)
        .then((r) =>
          r.json().then((events) => {
            setEvents(events);
          }),
        )
        .then(() => {
          fetch('/api/experience/get/' + session.id).then((r) =>
            r
              .json()
              .then((stats) => {
                setTotalExperience(stats.totalExperience);
              })
              .catch((e) => console.log(e)),
          );
        })
        .catch((e) => console.log(e));
  }, [session]);
  if (!session) return <></>;
  const totalTasks = events.filter(
    (event) => event.sourceType == 'task',
  ).length;
  const totalDecks = events.filter(
    (event) => event.sourceType == 'deck',
  ).length;
  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center mt-4 w-4/5">
        <div className="flex flex-col">
          <DateRangePicker
            ranges={[
              { startDate: new Date(), endDate: new Date(), key: 'selection' },
            ]}
            onChange={() => {}}
          />
          <div className="flex justify-center gap-20">
            <div className="flex flex-col gap-4">
              <p>În total</p>
              <p className="bg-slate-300 p-4 rounded-lg shadow-md">
                Ai strâns {totalExperience} experienta
              </p>
              <p className="bg-slate-300 p-4 rounded-lg shadow-md">
                Ai finalizat {totalTasks} task-uri
              </p>
              <p className="bg-slate-300 p-4 rounded-lg shadow-md">
                Ai parcurs deck-uri de {totalDecks} ori
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p>În perioada aleasă</p>
              <p className="bg-slate-300 p-4 rounded-lg shadow-md">
                Ai strâns {totalExperience} experienta
              </p>
              <p className="bg-slate-300 p-4 rounded-lg shadow-md">
                Ai finalizat {totalTasks} task-uri
              </p>
              <p className="bg-slate-300 p-4 rounded-lg shadow-md">
                Ai parcurs deck-uri de {totalDecks} ori
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Stats;
//20 01 ,13 01 Andy Sorin,3 02
