import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Timeline } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Navbar from '@/Components/header/Navbar';
const History = () => {
  const { data: session }: { data: Session | null } = useSession();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (session)
      fetch('/api/history/get/' + session.id)
        .then((r) =>
          r.json().then((events) => {
            setEvents(events);
            console.log(events);
          }),
        )
        .catch((e) => console.log(e));
  }, [session]);
  if (!session) return <></>;
  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center mt-4 w-4/5">
        <Timeline>
          {events ? (
            events.map((event) => {
              const date = new Date(event.date);
              return (
                <Timeline.Item>
                  <Timeline.Point />
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
