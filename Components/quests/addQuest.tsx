import { TextInput, Button } from "flowbite-react";
import { useAtomValue } from "jotai";
import { totalExperienceAtom } from "@/lib/atoms";
import { diff } from "../../lib/constants";
import { FC } from "react";
import { useState } from "react";
import { getExpFromDiff } from "@/lib/util";
import { PrismaQuest } from "@/types";
import { v4 } from "uuid";
const AddQuest: FC<{
  sessionId: string;
  setQuests: (quests) => void;
  setShowAdd: (value: boolean) => void;
}> = ({ sessionId, setQuests, setShowAdd }) => {
  const [newQuestName, setNewQuestName] = useState("");
  const [newQuestDiff, setNewQuestDiff] = useState(0);
  const totalExperience = useAtomValue(totalExperienceAtom);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sessionId, "handle submit 1");
    const newQuest: PrismaQuest = {
      id: v4(),
      tasks: [],
      title: newQuestName,
      experience: getExpFromDiff(totalExperience, newQuestDiff)*2,
      userId: sessionId,
      finished: false,
    };
    console.log(newQuest.id);
    setQuests((quests: PrismaQuest[]) => [...quests, newQuest]);
    await fetch("/api/quests/post/" + sessionId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newQuest.id,
        title: newQuest.title,
        experience: newQuest.experience,
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
          setShowAdd(false);
        }}
        className=" p-1 absolute self-end w-8  rounded-full  mr-2 hover:bg-purple-700 focus:bg-slate-300 focus:border"
      >
        <img src="close.png" alt="" />
      </button>
      <p>Quest title</p>

      <TextInput
        id="plainPrompt"
        type="text"
        placeholder="Quest title"
        className="flex-1 mb-2 w-4/5 pt-2"
        required={true}
        value={newQuestName}
        onChange={(e) => {
          setNewQuestName(e.target.value);
        }}
      />
      <p>Difficulty slider</p>

      <label
        htmlFor="minmax-range"
        className="text-center block mb-2 text-sm font-medium "
      >
        {diff[newQuestDiff] +
          " ( +" +
          getExpFromDiff(totalExperience, newQuestDiff)*2 +
          " exp )"}
      </label>
      <input
        className="range w-full h-2 accent-fuchsia-500 rounded-lg cursor-pointer mb-2"
        id="minmax-range"
        type="range"
        min="0"
        max="4"
        value={newQuestDiff}
        onChange={(e) => {
          setNewQuestDiff(Number(e.target.value));
        }}
      />
      <Button type="submit" className="bg-cyan-400">
        Add
      </Button>
    </form>
  );
};
export default AddQuest;
