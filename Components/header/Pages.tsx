import Page from "./Page";
import { signOut } from "next-auth/react";
export default function Pages({extended}) {
  return (
    <div className={" sm:flex bg-purple-600 flex-row-reverse justify-between h-full w-full px-2 sm:gap-6 sm:mr-5 " + (extended ?'flex':'hidden')}>
      <div
        className="flex h-full items-center"
        onClick={() => {
          signOut();
        }}
      >
        <Page text="LogOut" img="logout.png" link="/" />
      </div>

      {/* <Page text="Settings" img="settings.png" link="quests" /> */}
      <Page text="Test" img="test.svg" link="/Decks" />
      <Page text="Decks" img="decks.svg" link="/" />
      <Page text="Quests" img="quests.svg" link="quests" />
      <Page text="History" img="history.svg" link="history" />
      <Page text="Statistics" img="stats.svg" link="stats" />
    </div>
  );
}
