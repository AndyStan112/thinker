import { useState, useMemo, FC } from "react";
import Task from "./task";
import { Task as PrismaTask } from "@prisma/client";
const Quest: FC<{
  title: string;
  tasks: PrismaTask[];
  sessionId: string;
  getQuests: () => void;
}> = ({ title, tasks, sessionId, getQuests }) => {
  const [open, setOpen] = useState(false);
  console.log("tasks", tasks);
  const finished = tasks.every((task) => task.finished);
  const currExp: number = useMemo(
    () =>
      tasks
        .filter((task) => task.finished)
        .reduce((acc, task) => acc + task.experience, 0),
    [tasks]
  );
  const totalExp: number = useMemo(
    () => tasks.reduce((acc, task) => acc + task.experience, 0),
    [tasks]
  );
  return (
    <div className="flex flex-col  pl-2">
      <div className="flex items-center border-2 hover:border-sky-200 ">
        <img
          className="h-4/5"
          src={finished ? "check_box.svg" : "check_box_blank.svg"}
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
              "ml-auto " + (finished ? "text-emerald-700" : "text-slate-500")
            }
          >
            {currExp}/{totalExp} exp
          </p>
          <img
            className=""
            src={open ? "expand_less.svg" : "expand_more.svg"}
          ></img>
        </button>
      </div>
      {tasks ? (
        tasks.map((task) => (
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
  );
};
export default Quest;
