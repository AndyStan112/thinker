import Navbar from "@/Components/header/Navbar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Toast } from "flowbite-react";
import { GoAlert } from "react-icons/go";
import Quest from "@/Components/quests/quest";
const Quests = (props: any) => {
  const { data: session }: { data: Session } = useSession();
  const [quests, setQuests] = useState([]);
  const [incompleteError, setIncompleteError] = useState(false);
  const [showAdd, setShowAdd] = useState(true);
  const getQuests = async () => {
    await fetch("/api/quests/get/" + session.id)
      .then((r) =>
        r.json().then((quests) => {
          setQuests(quests);
          console.log(quests);
        })
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
      {incompleteError && (
        <Toast className="absolute left-1/2 -translate-x-1/2 bg-red-500 mt-5">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <GoAlert className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal text-white pr-2">
            Completează toate taskurile pentru a putea finaliza questul !
          </div>
          <Toast.Toggle
            onClick={() => {
              setIncompleteError(false);
            }}
          />
        </Toast>
      )}
      {showAdd && (
        <div className="absolute left-1/2 -translate-x-1/2 bg-red-500"></div>
      )}
      <div className=" absolute top-1/5 left-1/2 transform -translate-x-1/2  divide-gray-200 dark:divide-gray-700 "></div>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col w-1/2 bg-slate-200 rounded-lg shadow-md  ">
          {quests ? (
            quests.map((quest) => (
              <Quest
                quest={quest}
                key={quest.id}
                sessionId={session.id}
                getQuests={getQuests}
                setIncompleteError={setIncompleteError}
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
