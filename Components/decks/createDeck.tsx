import { TextInput, Button } from "flowbite-react";
import { useAtomValue } from "jotai";
import { totalExperienceAtom } from "@/lib/atoms";
import { FC } from "react";
import { useState } from "react";
//import { getExpFromDiff } from "@/lib/util";
import { PrismaDeck,PostDeck } from "@/types";
import { v4 } from "uuid";
import TagsInput from "./tagsInput"

//import { getNumberBetween } from "@/lib/util";
const CreateDeck: FC<{
  sessionId:string;
  setShowCreateDeck: (value: boolean) => void;
  setDecks: (decks) => void;
}> = ({  setShowCreateDeck, setDecks,sessionId }) => {
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");
  const totalExperience = useAtomValue(totalExperienceAtom);
  const [tags,setTags]=useState([])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log( "handle submit decks creation");
    const newDeck: PrismaDeck = {
      id: v4(),
      title: newDeckName,
      description: newDeckDescription,
      creatorId: sessionId,
      type:"flashcard",
      tags:tags.map((tag)=>({name:tag}))
    };
    console.log(newDeck);

    setDecks((decks:PostDeck[]) => [...decks,newDeck]);
    await fetch("/api/decks/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newDeck.id,
        title: newDeck.title,
        description: newDeck.description,
        creatorId: newDeck.creatorId,
        type:newDeck.type,
        tags
      }),
    }).catch((e) => console.log(e));
  };
  return (
    <form
      className="flex flex-col shadow-lg items-center text-white p-4 gap-2 accent-red-500"
       
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        onClick={() => {
          setShowCreateDeck(false);
        }}
        className=" p-1 absolute self-end w-8  rounded-full  mr-2 hover:bg-purple-700 focus:bg-slate-300 focus:border"
      >
        <img src="close.png" alt="" />
      </button>
      <p>Deck title</p>

      <TextInput
      onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
        id="plainPrompt"
        type="text"
        placeholder="Deck title"
        className="flex-1 mb-2 w-4/5 pt-2"
        required={true}
        value={newDeckName}
        onChange={(e) => {
          setNewDeckName(e.target.value);
        }}
      />
      <p>Deck description</p>

      <TextInput
      onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
        id="plainPrompt"
        type="text"
        placeholder="Deck description"
        className="flex-1 mb-2 w-4/5 pt-2"
        required={true}
        value={newDeckDescription}
        onChange={(e) => {
          setNewDeckDescription(e.target.value);
        }}
      />
      <p>Add tags</p>
      <TagsInput setTags={setTags} tags={tags}></TagsInput>
      <Button type="submit" className="bg-cyan-400">
        Add
      </Button>
    </form>
  );
};
export default CreateDeck;
