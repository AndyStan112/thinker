import styled from 'styled-components';
import Page from './Page';
const div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;
export default function Pages() {
  return (
    <div className="flex flex-row-reverse items-center w-full gap-8 mr-5">
      <Page text="LogOut" img="logout.png" />
      <Page text="Settings" img="settings.png" />
      <Page text="Statistics" img="stats.png" />
    </div>
  );
}
