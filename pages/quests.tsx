import Navbar from "@/Components/header/Navbar";
import AddQuest from "@/Components/quests/addQuest";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Toast, TextInput } from "flowbite-react";
import { GoAlert } from "react-icons/go";
import Quest from "@/Components/quests/quest";
import { PrismaQuest } from "@/types";
const Quests = (props: any) => {
  const { data: session }: { data: Session } = useSession();
  const [quests, setQuests] = useState<PrismaQuest[]>([]);
  const [incompleteError, setIncompleteError] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
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
  useEffect(() => {
    console.log(quests);
  }, [quests]);
  if (!session) return <></>;

  return (
    <>
      {incompleteError && (
        <Toast className="absolute left-1/2 -translate-x-1/2 bg-red-500 mt-5">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <GoAlert className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal text-black pr-2">
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
        <div className="absolute left-1/2 -translate-x-1/2 w-11/12 sm:w-1/3 md:1/2 mt-8 bg-violet-800 rounded-lg">
          <AddQuest
            sessionId={session.id}
            setQuests={setQuests}
            setShowAdd={setShowAdd}
          ></AddQuest>
        </div>
      )}
      <div className="flex flex-col items-center my-2">
        <div className="flex flex-col w-fit self-center">
          <button
            className="ml-2 my-2 flex items-center border-2 rounded-lg bg-purple-400 hover:bg-purple-500 border-purple-600 focus:border-fuchsia-800"
            onClick={() => setShowAdd(true)}
          >
            <img className="h-10" src="add_quest.svg"></img>
            <p className="mx-2">Add quest</p>
          </button>
        </div>
        <div className="flex flex-col text-xs sm:text-base  w-11/12 sm:w-1/2 bg-fuchsia-200 rounded-lg shadow-md border-2 border-[#8d7cd9] ">
          {quests.length ? (
            quests.map((quest) => (
              <Quest
                quest={quest}
                key={quest.id}
                sessionId={session.id}
                
                setQuests={setQuests}
                setIncompleteError={setIncompleteError}
              />
            ))
          ) : (
            <i className="text-center">
              Nu ai niciun quest. Apasă butonul pentru a crea un quest nou.
            </i>
          )}
        </div>
      </div>
    </>
  );
};

export default Quests;
