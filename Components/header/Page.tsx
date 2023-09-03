import { useState } from "react";
import Link from "next/link";
export default function Page(props) {
  const [extended, setExtended] = useState(false);
  return (
    <Link className="flex hover:bg-purple-700 h-full px-2 flex-row items-center " href={props.link}>
      <button
        className="flex items-center h-full my-15 min-w-10 min-h-10"
        onMouseEnter={() => {
          setExtended(true);
        }}
        onMouseLeave={() => {
          setExtended(false);
        }}
      >
        <p
          className={"transition-all mr-6 hidden ml:inline "+ (extended ? "md:inline" : "hidden")}
         
        >
          {props.text}
        </p>
        <img className="h-10 aspect-square" src={props.img} />
      </button>
    </Link>
  );
}
