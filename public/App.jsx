import styled from 'styled-components';
import Navbar from './Components/Navbar';
const Wrapper = styled.div`
  height: 100%;
  background-color: beige;
`;
const Content = styled.div`
  height: 100%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
  img {
    width: 10em;
    user-select: none;
  }
`;
const Buttons = styled.div``;
function App() {
  return (
    <Wrapper>
      <Navbar></Navbar>
      <Content>
        <h1>Thinker</h1>
        <img src="Mascot.png" alt="Mascot" />
        <h2>Promotes thinking, not skimping. The future of learning.</h2>
      </Content>
    </Wrapper>
  );
}

export default App;
