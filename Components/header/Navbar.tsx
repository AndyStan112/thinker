import Pages from "./Pages";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useAtom } from "jotai";
import { totalExperienceAtom } from "@/lib/atoms";
import {
  getCurrentExperiece,
  getCurrentExperienceNeeded,
  getLevel,
} from "@/lib/util";
import Link from "next/link";
export default function Navbar() {
  const { data: session }: { data: Session | null } = useSession();
  const [totalExperience, setTotalExperience] = useAtom(totalExperienceAtom);
  const [extended, setExtended] = useState(false)
  const [pulsing, setPulsing] = useState(true);
  useEffect(() => {
    if (session)
      fetch("/api/experience/get/" + session.id)
        .then((r) =>
          r.json().then(({ experience }) => {
            setTotalExperience(experience);
            console.log(experience);
          })
        )
        .catch((e) => console.log(e));
  }, [session]);

  return (<>
    <div className="flex  w-screen h-16 items-stretch bg-purple-600 -z-10 [p]:z-10">
      {/* <button onClick={() => fetch("/api/del/" + session.id)}>delete</button> */}
      {session && (
        <div className="flex flex-row items-center w-[150em] sm:w-[50em] ml-3">
          <Link  className="h-12 rounded-3xl z-30" href="/"><img
            className="h-12 rounded-3xl z-30"
           
            src={session?.user?.image ? session?.user?.image : "Avatar_1.jpg"}
          /></Link>
          
          <div className="flex items-center -translate-x-1 h-2/5 w-3/5">
            <div className="flex w-full justify-center h-full bg-white">
              <div
                onTransitionEnd={() => {
                  setPulsing(false);
                }}
                className={
                  `absolute bg-cyan-400 left-0  h-full z-10 transition-all duration-700` +
                  (pulsing ? "animate-pulse" : " ")
                }
                style={{
                  width:
                    (getCurrentExperiece(totalExperience) /
                      (getCurrentExperienceNeeded(totalExperience) || 1)) *
                      90 +
                    "%",
                }}
              ></div>
              <div className="flex text-center font-semibold ">
                <p className="text-black  z-20">
                  {getCurrentExperiece(totalExperience)}/
                </p>
                <p className="text-purple-800  z-20">
                  {getCurrentExperienceNeeded(totalExperience)} XP
                </p>
              </div>
            </div>
            <div className="aspect-square h-full bg-fuchsia-300 text-purple-900 flex justify-center font-bold">
              <p>{getLevel(totalExperience)}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end sm:hidden items-center mr-5  w-full ">
        <button className="flex" onClick={()=>{extended?setExtended(false):setExtended(true)}}>
          <img className="h-10 w-10 aspect-square " src='menu.svg'>
            </img></button></div>
            {!extended&&<Pages extended={extended} />}
    </div>
     {extended&&<Pages extended={extended} />}
    </>
  );
}
