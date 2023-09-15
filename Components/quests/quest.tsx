import { useState, useMemo, FC, Dispatch, SetStateAction } from "react";
import Task from "./task";
import { PrismaQuest } from "@/types";
import { totalExperienceAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Button } from "flowbite-react";
import AddTask from "./addTask";
const Quest: FC<{
  quest: PrismaQuest;
  setQuests: (quests) => void;
  sessionId: string;
 
  setIncompleteError: Dispatch<SetStateAction<boolean>>;
}> = ({ quest, sessionId,  setIncompleteError, setQuests }) => {
  const [open, setOpen] = useState(false);
  const [finished, setFinished] = useState(quest.finished);
  const canFinish = quest.tasks.every((task) => task.finished);
  const [totalExperience, setTotalExperience] = useAtom(totalExperienceAtom);
  const [showAddTask, setShowAddTask] = useState(false);
  const currQuestExp: number = useMemo(
    () =>
      quest.tasks
        .filter((task) => task.finished)
        .reduce((acc, task) => acc + task.experience, 0) +
      (finished ? quest.experience : 0),
    [quest,finished]
  );
  const totalQuestExp: number = useMemo(
    () =>
      quest.tasks.reduce((acc, task) => acc + task.experience, 0) +
      quest.experience,
    [quest]
  );
  return (
    <div className="flex flex-col first:rounded-t-lg last:rounded-b-lg ">
      {showAddTask && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-11/12 sm:w-1/3 md:1/2 mt-8 bg-violet-800 rounded-lg">
          <AddTask
            questId={quest.id}
            setQuests={setQuests}
            setShowAddTask={setShowAddTask}
          ></AddTask>
        </div>
      )}
      <div className="flex items-center  border-y-[1.5px]  border-[#8d7cd9] hover:border-solid hover:border-2 hover:border-sky-800 ">
        <img
          className="h-10  pl-2"
          onClick={async () => {
            if (!canFinish) {
              setIncompleteError(true);
              return;
            }
            if (finished) return;
            setTotalExperience(totalExperience + quest.experience);
            setFinished(true);
            await fetch("/api/experience/post/" + sessionId, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: quest.id,
                type: "quest",
                title: quest.title,
                experience: quest.experience,
              }),
            })
              .catch((e) => console.log(e));
          }}
          src={finished ? "check_box.svg" : "check_box_blank.svg"}
        ></img>
        <button
          className="flex items-center w-full ml-1"
          onClick={() => {
            setOpen(open ? false : true);
          }}
        >
          <p>{quest.title} </p>
          <p
            className={
              "ml-auto " +
              (finished ? "text-fuchsia-600 font-semibold" : "text-slate-500")
            }
          >
            {currQuestExp}/{totalQuestExp} +{quest.experience} exp
          </p>
          <img
            className=""
            src={open ? "expand_less.svg" : "expand_more.svg"}
          ></img>
        </button>
      </div>
      <div className="flex flex-col ">
        {quest.tasks.map((task) => (
          <Task
            key={task.id}
            show={open}
            task={task}
            questId={quest.id}
            sessionId={sessionId}
            setQuests={setQuests}
           
          />
        ))}
        {open && (
          <div className="flex flex-col w-fit self-center">
            <button
              className="ml-2 my-2 flex items-center border-2 rounded-lg bg-purple-400 hover:bg-purple-500 border-purple-600 focus:border-fuchsia-800"
              onClick={() => setShowAddTask(true)}
            >
              <img className="h-10" src="add_quest.svg"></img>
              <p className="mx-2">Add task</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Quest;
