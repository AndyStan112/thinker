import Navbar from "@/Components/header/Navbar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Quest from "@/Components/quests/quest";
const Quests = (props: any) => {
  const { data: session }: { data: Session } = useSession();
  const [quests, setQuests] = useState([]);
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
      <div className="flex justify-center mt-4">
        <div className="flex flex-col w-1/2 bg-slate-200 rounded-lg shadow-md  ">
          {quests ? (
            quests.map((quest) => (
              <Quest
                title={quest.title}
                tasks={quest.tasks}
                key={quest.id}
                sessionId={session.id}
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
