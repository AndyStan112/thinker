import Page from './Page';
export default function Pages() {
  return (
    <div className="flex flex-row-reverse items-center w-full gap-8 mr-5">
      <Page text="LogOut" img="logout.png" link="quests" />
      <Page text="Settings" img="settings.png" link="quests" />
      <Page text="Quests" img="quests.png" link="quests" />
      <Page text="History" img="history.png" link="quests" />
      <Page text="Decks" img="decks.png" link="quests" />
      <Page text="Statistics" img="stats.png" link="quests" />
    </div>
  );
}
