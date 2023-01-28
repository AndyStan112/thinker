import styled from 'styled-components';
import { useState } from 'react';

export default function Page(props) {
  const [extended, setExtended] = useState(false);
  return (
    <button
      className="flex items-center h-4/5"
      // onMouseEnter={() => {
      //   setExtended(true);
      // }}
      // onMouseLeave={() => {
      //   setExtended(false);
      // }}
    >
      {/* <p style={{ display: extended ? 'inline' : 'none' }}>{props.text}</p> */}
      <img className="h-4/6 aspect-square" src={props.img} />
    </button>
  );
}
