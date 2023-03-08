import Pages from './Pages';
import { useEffect } from 'react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import { currExpAtom, nextExpAtom, levelAtom } from '@/lib/atoms';
export default function Navbar() {
  const { data: session }: { data: Session | null } = useSession();
  const [currExp, setCurrExp] = useAtom(currExpAtom);
  const [nextExp, setNextExp] = useAtom(nextExpAtom);
  const [level, setLevel] = useAtom(levelAtom);
  useEffect(() => {
    if (session)
      fetch('/api/experience/get/' + session.id)
        .then((r) =>
          r.json().then(({ nextExp, currExp, level }) => {
            setNextExp(nextExp || 0);
            setCurrExp(currExp || 0);
            setLevel(level || 0);
            console.log(nextExp, currExp);
          }),
        )
        .catch((e) => console.log(e));
  }, [session, currExp]);
  if (!session) return <></>;
  console.log(session, 'a');

  return (
    <div className="flex w-screen h-16 bg-purple-600 -z-10 [p]:z-10">
      <div className="flex items-center w-[50em] ml-3">
        <img
          className="h-4/5 rounded-3xl z-10"
          src={session?.user?.image ? session?.user?.image : 'Avatar_1.jpg'}
        />
        <div className="flex items-center -translate-x-1 h-2/5 w-3/5">
          <div className="flex w-full justify-center h-full bg-neutral-400">
            <div
              className={`absolute bg-cyan-400 left-0  h-full z-10`}
              style={{ width: (currExp / nextExp) * 100 + '%' }}
            ></div>
            <div className="flex text-center ">
              <p className="text-gray-700 z-20">{currExp}/</p>
              <p className="text-yel z-20">{nextExp} XP</p>
            </div>
          </div>
          <div className="aspect-square h-full bg-yellow-900 text-green-500 flex justify-center font-bold">
            <p>{level}</p>
          </div>
        </div>
      </div>
      <Pages />
    </div>
  );
}
