import { useState, useMemo, FC, Dispatch, SetStateAction } from "react";
import Task from "./task";
import { PrismaQuest } from "@/types";
import { totalExperienceAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

const Quest: FC<{
  quest: PrismaQuest;
  sessionId: string;
  getQuests: () => void;
  setIncompleteError: Dispatch<SetStateAction<boolean>>;
}> = ({ quest, sessionId, getQuests, setIncompleteError }) => {
  const [open, setOpen] = useState(false);
  const [finished, setFinished] = useState(quest.finished);
  const canFinish = quest.tasks.every((task) => task.finished);
  const [totalExperience, setTotalExperience] = useAtom(totalExperienceAtom);

  const currQuestExp: number = useMemo(
    () =>
      quest.tasks
        .filter((task) => task.finished)
        .reduce((acc, task) => acc + task.experience, 0),
    [quest]
  );
  const totalQuestExp: number = useMemo(
    () =>
      quest.tasks.reduce((acc, task) => acc + task.experience, 0) +
      quest.experience,
    [quest]
  );
  return (
    <>
      <div className="flex flex-col  pl-2">
        <div className="flex items-center border-2 hover:border-sky-200 ">
          <img
            className="h-4/5"
            onClick={async () => {
              if (!canFinish) {
                setIncompleteError(true);
                return;
              }
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
                .then(() => getQuests())
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
                "ml-auto " + (finished ? "text-emerald-700" : "text-slate-500")
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
        {quest.tasks ? (
          quest.tasks.map((task) => (
            <Task
              key={task.id}
              show={open}
              task={task}
              sessionId={sessionId}
              getQuests={getQuests}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Quest;
