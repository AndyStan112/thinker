import styled from 'styled-components';
import Page from './Page';
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;
export default function Pages() {
  return (
    <Wrapper>
      <Page text="LogOut" img="logout.png" />
      <Page text="Settings" img="settings.png" />
      <Page text="Statistics" img="stats.png" />
    </Wrapper>
  );
}
