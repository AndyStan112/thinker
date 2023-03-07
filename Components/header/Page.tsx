//import { useState } from 'react';
import Link from 'next/link';
export default function Page(props) {
  //const [extended, setExtended] = useState(false);
  return (
    <Link className="flex items-center h-4/6" href={props.link}>
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
        <img className="h-full aspect-square" src={props.img} />
      </button>
    </Link>
  );
}
