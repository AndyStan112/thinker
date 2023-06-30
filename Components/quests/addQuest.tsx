import { TextInput, Button } from "flowbite-react";
import { useAtom } from "jotai";
import { diff } from "../../lib/constants";
import { FC } from "react";
import { useState } from "react";
const AddQuest: FC<{
  sessionId: string;
  getQuests: () => void;
}> = ({ sessionId, getQuests }) => {
  const [newQuestName, setNewQuestName] = useState("");
  const [newQuestDiff, setNewQuestDiff] = useState(0);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sessionId, "handle submit 1");
  };
  return (
    <form
      className="flex flex-col items-center text-white p-4 gap-2 accent-red-500"
      onSubmit={handleSubmit}
    >
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
        {diff[newQuestDiff]}
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
      <Button className="bg-cyan-400">Add</Button>
    </form>
  );
};
export default AddQuest;
