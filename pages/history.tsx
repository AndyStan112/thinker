import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Timeline } from "flowbite-react";
import { useEffect, useState } from "react";
import Navbar from "@/Components/header/Navbar";
import tdot from "../public/tdot.svg"
const CircleIcon = () => (
  <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="49" r="10" stroke="purple" strokeWidth="3" fill="purple" />
  </svg>
);

const History = () => {
  const { data: session }: { data: Session | null } = useSession();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (session)
      fetch("/api/history/get/" + session.id)
        .then((r) =>
          r.json().then((events) => {
            setEvents(events);
          })
        )
        .catch((e) => console.log(e));
  }, [session]);
  if (!session) return <></>;

  return (
    <>
      <Navbar></Navbar>

      <div className="flex justify-center mt-4 w-4/5">
        {!events.length ? (
          <p className="bg-slate-300 rounded-xl p-3">Istoricul este gol</p>
        ) : (
          <></>
        )}
        <Timeline>
          {events ? (
            events.map((event) => {
              const date = new Date(event.date);
              return (
                <Timeline.Item>
                  <Timeline.Point icon={CircleIcon} className="bg-none" />
                  <Timeline.Content>
                    <Timeline.Time>{date.toLocaleDateString()}</Timeline.Time>
                    <Timeline.Title>
                      Ai finalizat {event.sourceType}-ul "{event.source}"
                    </Timeline.Title>
                  </Timeline.Content>
                </Timeline.Item>
              );
            })
          ) : (
            <p>Istoricul este gol</p>
          )}
        </Timeline>
      </div>
    </>
  );
};
export default History;
