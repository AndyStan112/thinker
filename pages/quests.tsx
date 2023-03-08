import Navbar from '@/Components/header/Navbar';
import { useState, useMemo, useEffect } from 'react';
import { useAtom } from 'jotai';
import { currExpAtom } from '@/lib/atoms';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
const Task = ({ show, task, getQuests }) => {
  const [open, setOpen] = useState(false);
  const { data: session }: { data: Session | null } = useSession();
  const [currExp, setCurrExp] = useAtom(currExpAtom);
  return show ? (
    <div className="flex flex-col border-y-2 border-amber-200 pl-4 ml-2">
      <div className="flex items-center border-2 hover:border-sky-200">
        <img
          className={'h-4/6 ' + (task.finished ? 'pointer-events-none' : '')}
          onClick={() => {
            fetch('/api/experience/post/' + session.id, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: task.id,
                type: 'task',
                title: task.title,
                experience: task.experience,
              }),
            })
              .then(() => getQuests())
              .then(() => setCurrExp(currExp + task.experience))
              .catch((e) => console.log(e));
          }}
          src={task.finished ? 'check_box.svg' : 'check_box_blank.svg'}
        ></img>
        <button
          className="flex items-center w-full ml-1"
          onClick={() => {
            setOpen(open ? false : true);
          }}
        >
          {task.title}
          <p
            className={
              'ml-auto ' +
              (task.finished ? 'text-emerald-700' : 'text-slate-500')
            }
          >
            {task.experience} exp
          </p>
          <img
            className=""
            src={open ? 'expand_less.svg' : 'expand_more.svg'}
          ></img>
        </button>
      </div>
      <div className={'ml-4 ' + (!open ? 'hidden' : 'inline')}>
        {task.description}
      </div>
    </div>
  ) : (
    <></>
  );
};
const Quest = ({ title, tasks, getQuests }) => {
  const [open, setOpen] = useState(false);
  //console.log(tasks);
  const finished = tasks.every((task) => task.finished);
  const currExp: number = useMemo(
    () =>
      tasks
        .filter((task) => task.finished)
        .reduce((acc, task) => acc + task.experience, 0),
    [tasks],
  );
  const totalExp: number = useMemo(
    () => tasks.reduce((acc, task) => acc + task.experience, 0),
    [tasks],
  );
  return (
    <div className="flex flex-col  pl-2">
      <div className="flex items-center border-2 hover:border-sky-200 ">
        <img
          className="h-4/5"
          src={finished ? 'check_box.svg' : 'check_box_blank.svg'}
        ></img>
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
            {currExp}/{totalExp} exp
          </p>
          <img
            className=""
            src={open ? 'expand_less.svg' : 'expand_more.svg'}
          ></img>
        </button>
      </div>
      {tasks ? (
        tasks.map((task) => (
          <Task key={task.id} show={open} task={task} getQuests={getQuests} />
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
      <div className="flex justify-center mt-4">
        <div className="flex flex-col w-1/2 bg-slate-200 rounded-lg shadow-md  ">
          {quests ? (
            quests.map((quest) => (
              <Quest
                title={quest.title}
                tasks={quest.tasks}
                key={quest.id}
                getQuests={getQuests}
              />
            ))
          ) : (
            <p>
              Nu ai niciun quest.Apasă butonul din dreapta pentru a crea un
              quest nou.
            </p>
          )}
        </div>
        <button className="ml-2 flex">
          <img src="add_quest.svg"></img>
        </button>
      </div>
    </>
  );
};

export default Quests;
