import styled from 'styled-components';
import { useState } from 'react';
const Wrapper = styled.div`
  //max-width: 1.5em;
  height: 80%;
  margin-right: 0.15em;
  padding-left: 0.2em;
  padding-right: 0.2em;
  font-size: 1.4em;
  display: flex;
  align-items: center;
  :hover {
    border: 3px double #3c3232;
    background-color: #808080;
  }
  img {
    margin-left: 0.1em;
    height: 1.5em;
  }
`;
export default function Page(props) {
  const [extended, setExtended] = useState(false);
  return (
    <Wrapper
      onMouseEnter={() => {
        setExtended(true);
      }}
      onMouseLeave={() => {
        setExtended(false);
      }}
    >
      <p style={{ display: extended ? 'inline' : 'none' }}>{props.text}</p>
      <img src={props.img} />
    </Wrapper>
  );
}
