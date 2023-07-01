import { TextInput, Button } from "flowbite-react";
import { useAtomValue } from "jotai";
import { totalExperienceAtom } from "@/lib/atoms";
import { diff } from "../../lib/constants";
import { FC } from "react";
import { useState } from "react";
import { getExpFromDiff } from "@/lib/util";
import { Task } from "@prisma/client";
import { v4 } from "uuid";
import { PrismaQuest } from "@/types";
const AddTask: FC<{
  questId: string;
  setShowAddTask: (value: boolean) => void;
  setQuests: (quests) => void;
}> = ({ questId, setShowAddTask, setQuests }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDiff, setNewTaskDiff] = useState(0);
  const totalExperience = useAtomValue(totalExperienceAtom);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(questId, "handle submit 1");
    const newTask: Task = {
      id: v4(),
      title: newTaskName,
      description: newTaskDescription,
      experience: getExpFromDiff(totalExperience, newTaskDiff),
      questId,
      finished: false,
    };
    console.log(newTask.id);

    setQuests((quests: PrismaQuest[]) => {
      const index = quests.findIndex((quest) => quest.id === questId);
      const newTasks = [...quests[index].tasks, newTask];
      const newQuests = quests.map((quest) =>
        quest.id === questId ? { ...quest, tasks: newTasks } : quest
      );
      return newQuests;
    });
    await fetch("/api/tasks/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newTask.id,
        title: newTask.title,
        experience: newTask.experience,
        description: newTask.description,
        questId,
      }),
    }).catch((e) => console.log(e));
  };
  return (
    <form
      className="flex flex-col items-center text-white p-4 gap-2 accent-red-500"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        onClick={() => {
          setShowAddTask(false);
        }}
        className=" p-1 absolute self-end w-8  rounded-full  mr-2 hover:bg-purple-700 focus:bg-slate-300 focus:border"
      >
        <img src="close.png" alt="" />
      </button>
      <p>Task title</p>

      <TextInput
        id="plainPrompt"
        type="text"
        placeholder="Task title"
        className="flex-1 mb-2 w-4/5 pt-2"
        required={true}
        value={newTaskName}
        onChange={(e) => {
          setNewTaskName(e.target.value);
        }}
      />
      <p>Task description</p>

      <TextInput
        id="plainPrompt"
        type="text"
        placeholder="Task description"
        className="flex-1 mb-2 w-4/5 pt-2"
        required={true}
        value={newTaskDescription}
        onChange={(e) => {
          setNewTaskDescription(e.target.value);
        }}
      />
      <p>Difficulty slider</p>

      <label
        htmlFor="minmax-range"
        className="text-center block mb-2 text-sm font-medium "
      >
        {diff[newTaskDiff] +
          " ( +" +
          getExpFromDiff(totalExperience, newTaskDiff) +
          " exp )"}
      </label>
      <input
        className="range w-full h-2 accent-fuchsia-500 rounded-lg cursor-pointer mb-2"
        id="minmax-range"
        type="range"
        min="0"
        max="4"
        value={newTaskDiff}
        onChange={(e) => {
          setNewTaskDiff(Number(e.target.value));
        }}
      />
      <Button type="submit" className="bg-cyan-400">
        Add
      </Button>
    </form>
  );
};
export default AddTask;
