import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { DateRangePicker } from "react-date-range";
import { useEffect, useState } from "react";
import { ro } from "date-fns/locale";
import { isInRange } from "@/lib/util";
import Navbar from "@/Components/header/Navbar";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
const Stats = () => {
  const { data: session }: { data: Session | null } = useSession();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [events, setEvents] = useState([]);
  const [totalExperience, setTotalExperience] = useState(0);
  useEffect(() => {
    if (session)
      fetch("/api/history/get/" + session.id)
        .then((r) => r.json())
        .then((events) => {
          setEvents(events);
        })

        .then(() => {
          fetch("/api/experience/get/" + session.id)
            .then((r) => r.json())
            .then((stats) => {
              setTotalExperience(stats.experience);
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
  }, [session]);
  if (!session) return <></>;
  const totalTasks = events.filter(
    (event) => event.sourceType == "task"
  ).length;
  const selectedTasks = events.filter(
    (event) =>
      event.sourceType == "task" &&
      isInRange(event.date, state[0].startDate, state[0].endDate)
  ).length;
  const totalQuests = events.filter(
    (event) => event.sourceType == "quest"
  ).length;
  const selectedQuests = events.filter(
    (event) =>
      event.sourceType == "quest" &&
      isInRange(event.date, state[0].startDate, state[0].endDate)
  ).length;
  const tap = (x) => {
    console.log(x);
    return x;
  };
  const selectedExperience = tap(
    events.filter((event) =>
      isInRange(event.date, state[0].startDate, state[0].endDate)
    )
  ).reduce((acc, event) => acc + event.experience, 0);
  const totalDecks = events.filter(
    (event) => event.sourceType == "deck"
  ).length;
  const selectedDecks = events.filter(
    (event) =>
      event.sourceType == "deck" &&
      isInRange(event.date, state[0].startDate, state[0].endDate)
  ).length;
  // const comp = events.reduce((acc, curr) => acc + curr.experience, 0);
  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center mt-4 w-4/5">
        <div className="flex flex-col">
          <DateRangePicker
            onChange={(item) => {
              console.log(item.selection);
              return setState([item.selection]);
            }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            locale={ro}
            ranges={state}
            maxDate={new Date()}
            rangeColors={["rgb(162 28 175)", "green"]}
          />
          <div className="ALL flex justify-center gap-20">
            <div className="flex flex-col gap-4">
              <p>În total</p>
              <p className="bg-fuchsia-200 p-4 rounded-lg shadow-md">
                Ai strâns {totalExperience} experientă
              </p>
              <p className="bg-fuchsia-200 p-4 rounded-lg shadow-md">
                Ai finalizat {totalQuests} quest-uri
              </p>
              <p className="bg-fuchsia-200 p-4 rounded-lg shadow-md">
                Ai finalizat {totalTasks} task-uri
              </p>
              <p className="bg-fuchsia-200 p-4 rounded-lg shadow-md">
                Ai parcurs deck-uri de {totalDecks} ori
              </p>
            </div>

            <div className="SELECTED flex flex-col gap-4">
              <p>În perioada aleasă</p>
              <p className="bg-fuchsia-200 p-4 rounded-lg shadow-md">
                Ai strâns {selectedExperience} experientă
              </p>
              <p className="bg-fuchsia-200 p-4 rounded-lg shadow-md">
                Ai finalizat {selectedQuests} quest-uri
              </p>
              <p className="bg-fuchsia-200 p-4 rounded-lg shadow-md">
                Ai finalizat {selectedTasks} task-uri
              </p>
              <p className="bg-fuchsia-200 p-4 rounded-lg shadow-md">
                Ai parcurs deck-uri de {selectedDecks} ori
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Stats;
//20 01 ,13 01 Andy Sorin,3 02
