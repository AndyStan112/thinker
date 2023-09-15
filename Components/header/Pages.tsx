import Page from "./Page";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LogInCard from "../auth/LogInCard";

export default function Pages({extended}) {
  const [isOpen,setIsOpen] = useState(false);
  const { data, status }= useSession()
  return (
    <div className={" sm:flex bg-purple-600 flex-row-reverse  justify-between lg:justify-center h-full w-full px-2  sm:mr-5 " + (extended ?'flex':'hidden')}>
     { isOpen && <LogInCard setIsOpen={setIsOpen}></LogInCard>}
      {status  === "authenticated" ?<div  
        className="flex h-full items-center"
        onClick={() => {
          signOut();
        }}
      >
        <Page text="LogOut" img="logout.png" link="/" />
      </div> : <div
        className="flex h-full items-center"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Page text="Log In" img="login.png" link="/" />
      </div>}

      {/* <Page text="Settings" img="settings.png" link="quests" /> */}
      <Page text="Test" img="test.svg" link="wip" />
      <Page text="Decks" img="decks.svg" link="decks" />
      <Page text="Quests" img="quests.svg" link="quests" />
      <Page text="History" img="history.svg" link="history" />
      <Page text="Statistics" img="stats.svg" link="stats" />
    </div>
  );
}
