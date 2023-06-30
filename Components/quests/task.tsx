import { totalExperienceAtom } from "@/lib/atoms";
import { Task as PrismaTask } from "@prisma/client";
import { useAtom } from "jotai";
import { FC } from "react";
import { useState } from "react";
const Task: FC<{
  show: boolean;
  task: PrismaTask;
  sessionId: string;
  getQuests: () => void;
}> = ({ show, task, sessionId, getQuests }) => {
  const [open, setOpen] = useState(false);
  const [finished, setFinished] = useState(task.finished);
  const [totalExperience, setTotalExperience] = useAtom(totalExperienceAtom);
  return show ? (
    <div className="flex flex-col border-b-2 border-l-[12px] border-fuchsia-700 pl-4  hover:border-t-2 hover:border-r-2 hover:border-solid  hover:border-purple-900">
      <div className="flex items-center border-none border-2 hover:border-solid  hover:border-sky-800 ">
        <img
          className={"h-4/6 " + (finished ? "pointer-events-none" : "")}
          onClick={async () => {
            setTotalExperience(totalExperience + task.experience);
            setFinished(true);
            await fetch("/api/experience/post/" + sessionId, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: task.id,
                type: "task",
                title: task.title,
                experience: task.experience,
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
          {task.title}
          <p
            className={
              "ml-auto " +
              (finished ? "text-fuchsia-600 font-semibold" : "text-slate-500")
            }
          >
            +{task.experience} exp
          </p>
          <img
            className=""
            src={open ? "expand_less.svg" : "expand_more.svg"}
          ></img>
        </button>
      </div>
      <div className={"ml-4 mb-4 " + (!open ? "hidden" : "inline")}>
        {task.description}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Task;
