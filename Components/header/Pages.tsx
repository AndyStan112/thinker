import Page from "./Page";
import { signOut } from "next-auth/react";
export default function Pages() {
  return (
    <div className="flex flex-row-reverse items-center w-full gap-8 mr-5">
      <div
        className="flex h-full items-center"
        onClick={() => {
          signOut();
        }}
      >
        <Page text="LogOut" img="logout.png" link="/" />
      </div>

      <Page text="Settings" img="settings.png" link="quests" />
      <Page text="Quests" img="quests.png" link="quests" />
      <Page text="History" img="history.png" link="history" />
      <Page text="Decks" img="decks.png" link="quests" />
      <Page text="Statistics" img="stats.png" link="stats" />
    </div>
  );
}
