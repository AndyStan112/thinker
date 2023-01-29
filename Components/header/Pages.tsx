import Page from './Page';
export default function Pages() {
  return (
    <div className="flex flex-row-reverse items-center w-full gap-8 mr-5">
      <Page text="LogOut" img="logout.png" />
      <Page text="Settings" img="settings.png" />
      <Page text="Statistics" img="stats.png" />
    </div>
  );
}
