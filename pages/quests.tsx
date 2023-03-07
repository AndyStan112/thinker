import Navbar from '@/Components/header/Navbar';
import { useState, memo, useEffect } from 'react';
import { Accordion } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Prisma } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
const Task = ({ show, task, getQuests }) => {
  const [open, setOpen] = useState(false);

  return show ? (
    <div className="flex flex-col border-y-2 border-amber-200 pl-4 ml-2">
      <div className="flex items-center border-2 hover:border-sky-200">
        <input
          type="checkbox"
          className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
        />
        <button
          className="flex items-center w-full ml-1"
          onClick={() => {
            setOpen(open ? false : true);
          }}
        >
          {task.title}
          <img
            className="ml-auto"
            src={open ? 'expand_less.svg' : 'expand_more.svg'}
          ></img>
        </button>
      </div>
      <div className={'ml-4 ' + (!open ? 'hidden' : 'inline')}>sdm;</div>
    </div>
  ) : (
    <></>
  );
};
const Quest = ({ title, tasks, getQuests }) => {
  const [open, setOpen] = useState(false);
  const finished = tasks.every((task) => task.finished);
  return (
    <div className="flex flex-col  pl-2">
      <div className="flex items-center border-2 hover:border-sky-200 pointer-events-none">
        <img src={finished ? 'check_box.svg' : 'check_box_empty.svg'}></img>
        <button
          className="flex items-center w-full ml-1"
          onClick={() => {
            setOpen(open ? false : true);
          }}
        >
          <p>{title} </p>
          <p
            className={
              'ml-auto ' + (finished ? 'text-emerald-700' : 'text-slate-500')
            }
          >
            {' '}
            23/45 exp
          </p>
          <img
            className=""
            src={open ? 'expand_less.svg' : 'expand_more.svg'}
          ></img>
        </button>
      </div>
      {tasks ? (
        tasks.map((task) => (
          <Task show={open} task={task} getQuests={getQuests} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

const Quests = (props: any) => {
  const { data: session }: { data: Session | null } = useSession();
  const [quests, setQuests] = useState([]);
  const getQuests = () => {
    fetch('/api/quests/get/' + session.id)
      .then((r) =>
        r.json().then((quests) => {
          setQuests(quests);
          console.log(quests);
        }),
      )
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (session) getQuests();
  }, [session]);
  if (!session) return <></>;

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2 bg-slate-200 rounded-lg shadow-md mt-4  ">
          {quests ? (
            quests.map((quest) => (
              <Quest
                title={quest.title}
                tasks={quest.tasks}
                getQuests={getQuests}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Quests);
