import styled from 'styled-components';
import Pages from './Pages';
const Wrapper = styled.div`
  display: flex;
  position: relative;
  background-color: #8446e9ea;
  width: 100%;
  z-index: 1;
  height: 4.5em;
  p {
    z-index: 5;
    user-select: none;
  }
  img {
    z-index: 10;
  }
`;

const Progress = styled.div`
  width: 50em;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Avatar = styled.img`
  margin-left: 1%;
  height: 80%;
  object-fit: cover;
  border-radius: 50%;
  background-color: cyan;
`;
const BarWrapper = styled.div`
  z-index: inherit;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: left;
  height: 40%;
  width: 65%;
  translate: -0.3em;
`;
const ProgressBar = styled.div`
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: rgba(183, 183, 183, 1);
`;
const BarSpan = styled.span`
  background-color: rgba(78, 198, 224, 1);
  left: 0px;
  width: 40%;
  height: 100%;
  position: absolute;
`;
const CurrentXp = styled.p`
  color: rgba(106, 106, 104, 1);
`;
const NeededXp = styled.p`
  color: #ffff00;
`;
const Level = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1/1;
  color: #0df30d;
  background-color: #6a1515;
  font-weight: 700;
`;
export default function Navbar() {
  return (
    <Wrapper>
      <Progress>
        <Avatar src="Avatar_1.jpg" draggable="false" />
        <BarWrapper>
          <ProgressBar>
            <BarSpan></BarSpan>
            <CurrentXp>23/</CurrentXp>
            <NeededXp>158 XP</NeededXp>
          </ProgressBar>
          <Level>
            <p>5</p>
          </Level>
        </BarWrapper>
      </Progress>
      <Pages />
    </Wrapper>
  );
}
